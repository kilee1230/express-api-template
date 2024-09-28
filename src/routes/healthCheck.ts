import { Request, Response } from "express";

export const healthCheckHandler = (_: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
};
