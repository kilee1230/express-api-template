import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";

import { errorMiddleware } from "./middleware/error";
import logMiddleware from "./middleware/logger";
import { router } from "./routes";

export const createApp = (): Application =>
  express()
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(logMiddleware)
    .use(errorMiddleware)
    .use(router);
