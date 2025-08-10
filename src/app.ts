import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";

import { errorMiddleware } from "./middleware/error.js";
import logMiddleware from "./middleware/logger.js";
import { router } from "./routes/index.js";

export const createApp = (): Application =>
  express()
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(logMiddleware)
    .use(errorMiddleware)
    .use(router);
