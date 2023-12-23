import { NextFunction, Request, Response } from "express";

export const healthCheckHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const error = new Error("Missing or invalid id") as any;
  // error.status = 400;

  throw new Error("Missing or invalid id");
  // // Pass the error to the next middleware
  // next(error);
  return res.status(500).json({ message: "Missing or invalid id" });
  // return res.status(200).json({ status: "ok" });
};
