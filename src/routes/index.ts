import { Router } from "express";

import { healthCheckHandler } from "./healthCheck";

export const router = Router().get("/health", healthCheckHandler);
