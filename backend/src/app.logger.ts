import pino from "pino"

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    options: {
      colorize: true,
    },
    target: "pino-pretty",
  },
})

export default logger
