import supertest from "supertest";

import { createApp } from "./app";

describe("GET /health", () => {
  const app = createApp();
  const request = new supertest.agent(app);

  it("responds with 200 OK and sets ETag", async () => {
    const res = await request.get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
    expect(res.headers).toHaveProperty("etag");
    expect(typeof res.headers["etag"]).toBe("string");
  });

  it("responds with 304 Not Modified when If-None-Match matches", async () => {
    const first = await request.get("/health");
    const etag = first.headers["etag"] as string;
    expect(etag).toBeTruthy();

    const second = await request.get("/health").set("If-None-Match", etag);
    expect(second.status).toBe(304);
    // No body on 304
    expect(second.body).toEqual({});
    // ETag should still be present (some servers echo it)
    expect(second.headers["etag"]).toBe(etag);
  });
});
