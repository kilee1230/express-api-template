import { Router } from "express";

import { HealthCheckController } from "../controllers/index.js";

const router = Router();

router.get("/", HealthCheckController.getStatus);

export default router;
