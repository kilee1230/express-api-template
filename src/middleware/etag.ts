import crypto from "crypto";

import { NextFunction, Request, Response } from "express";

/**
 * ETag middleware
 * Generates a strong ETag for JSON / text / javascript / html responses when one is not already set.
 * Skips if the response already has an ETag, is a HEAD request, or the status code implies no body.
 */
export function etagMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // capture original send
  const originalSend = res.send.bind(res);

  res.send = function patchedSend(body?: any): Response {
    try {
      if (
        req.method !== "HEAD" &&
        !res.getHeader("ETag") &&
        shouldHaveEntityBody(res.statusCode) &&
        body !== undefined
      ) {
        const contentType = (res.getHeader("Content-Type") || "").toString();
        if (/json|text|javascript|xml|html/.test(contentType)) {
          const buf = toBuffer(body, contentType);
          const etag = generateStrongETag(buf);
          res.setHeader("ETag", etag);

          // Conditional request handling (If-None-Match)
          const ifNoneMatch = req.headers["if-none-match"];
          if (ifNoneMatch && etagMatches(ifNoneMatch, etag)) {
            // Per RFC7232: 304 MUST NOT include message-body
            res.statusCode = 304;
            // Remove headers that only make sense with a body
            res.removeHeader("Content-Type");
            res.removeHeader("Content-Length");
            return originalSend();
          }
        }
      }
    } catch {
      // fail silently; do not block response on ETag failures
    }
    return originalSend(body);
  } as any;

  next();
}

function shouldHaveEntityBody(statusCode?: number) {
  if (!statusCode) return true;
  return ![204, 205, 304].includes(statusCode);
}

function toBuffer(body: any, contentType: string): Buffer {
  if (Buffer.isBuffer(body)) return body;
  if (typeof body === "string") return Buffer.from(body);
  // assume json-like
  if (/json/.test(contentType)) return Buffer.from(JSON.stringify(body));
  return Buffer.from(String(body));
}

function generateStrongETag(content: Buffer): string {
  const hash = crypto.createHash("sha256").update(content).digest("base64");
  // shorten without losing much uniqueness (optional)
  const short = hash.replace(/=+$/, "").slice(0, 27);
  return '"' + short + '"';
}

function etagMatches(ifNoneMatchHeader: string | string[], current: string) {
  const header = Array.isArray(ifNoneMatchHeader)
    ? ifNoneMatchHeader.join(",")
    : ifNoneMatchHeader;
  if (header.trim() === "*") return true;
  // Header may contain multiple comma-separated ETags possibly with weak validators (W/)
  return header
    .split(",")
    .map((v) => v.trim())
    .some((tag) => stripWeak(tag) === current);
}

function stripWeak(tag: string) {
  return tag.startsWith("W/") ? tag.slice(2) : tag;
}

export default etagMiddleware;
