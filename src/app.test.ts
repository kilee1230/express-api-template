import supertest from "supertest";

import { createApp } from "./app.js";

describe("GET /health", () => {
  const app = createApp();
  const request = new supertest.agent(app);

  it("responds with 200 OK", async () => {
    await expect(request.get("/health")).resolves.toMatchObject({
      status: 200,
      body: { status: "ok" }
    });
  });
});
