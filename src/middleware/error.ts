import { NextFunction, Request, Response } from "express";

export const errorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await next();
  } catch (error: any) {
    const { status = 500, message = "Internal Server Error" } = error;

    req.log[status === 404 ? "info" : "error"](error);

    res.status(status).json({ error: { message } });
  }
};
