import { Router } from "express";

import { HealthCheckController } from "../controllers";

const router = Router();

router.get("/", HealthCheckController.getStatus);

export default router;
