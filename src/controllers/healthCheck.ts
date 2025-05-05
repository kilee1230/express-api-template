import { Request, Response } from "express";

export const healthCheckController = {
  getStatus: (_: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  }
};
