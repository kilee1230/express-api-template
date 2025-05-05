import { Router } from "express";

import { healthCheckController } from "../controllers/healthCheck";

const router = Router();

router.get("/", healthCheckController.getStatus);

export default router;
