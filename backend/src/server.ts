import logger from "@logger"
import mongoose from "mongoose"

import app from "./app"
import config from "./config"

mongoose
  .connect(config.mongoUri)
  .then(() => {
    logger.info("Connected to MongoDB")
    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`)
    })
  })
  .catch(err => {
    logger.error("MongoDB connection error:", err)
    process.exit(1)
  })
