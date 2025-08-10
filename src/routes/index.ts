import { Router } from "express";

import healthCheckRouter from "./healthCheck";

export const router = Router();

router.use("/health", healthCheckRouter);
