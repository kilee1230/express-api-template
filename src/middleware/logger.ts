import type { Handler, NextFunction, Request, Response } from "express";
import logger from "pino-http";

const redactPaths = [
  "req.headers.cookie",
  "req.headers.authorization",
  "req.headers.referer",
  "req.headers.from",
  "req.headers.masq",
  "req.body.password"
];

const logMiddleware = logger({
  name: "express-api-template",
  level: "info",
  autoLogging: false,
  redact: {
    paths: redactPaths,
    censor: "**REDACTED**"
  },
  formatters: {
    level(label: string) {
      return { level: label };
    }
  },
  transport:
    process.env.NODE_ENV === "local" ? { target: "pino-pretty" } : undefined
}) as Handler;

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.path && req.path.toLowerCase() === "/health") {
    return next();
  }
  return logMiddleware(req, res, next);
}
