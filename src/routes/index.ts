import { Router } from "express";

import healthCheckRouter from "./healthCheck.js";

export const router = Router();

router.use("/health", healthCheckRouter);
