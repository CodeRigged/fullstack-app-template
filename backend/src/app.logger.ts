import pino from "pino"

import config from "./config"

const logger = pino({
  level: config.logLevel,
  transport: {
    options: {
      colorize: true,
    },
    target: "pino-pretty",
  },
})

export default logger
