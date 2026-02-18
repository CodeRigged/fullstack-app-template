import logger from "@logger"
import bodyParser from "body-parser"
import cors from "cors"
import { Express } from "express"
import pino, { Options } from "pino-http"

import config from "./config"

const pinoOptions: Options =
  config.nodeEnv === "test"
    ? {
        level: "silent",
      }
    : {}

/**
 * Applies all global middleware to the Express app.
 */
export function applyMiddleware(app: Express) {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(
    pino({
      logger,
      ...pinoOptions,
    })
  )
}
