import { Request, Response } from "express";

export const HealthCheckController = {
  getStatus: (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  }
};
