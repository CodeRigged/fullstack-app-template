import logger from "@logger"
import dotenv from "dotenv"
import Joi from "joi"

dotenv.config()

const envSchema = Joi.object({
  MONGO_URI: Joi.string().uri().required(),
  NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
  PORT: Joi.number().default(5000),
}).unknown()

const { error, value: envVars } = envSchema.validate(process.env, { abortEarly: false })

if (error) {
  logger.error("Config validation error(s):")
  error.details.forEach(detail => {
    logger.error(`- ${detail.message}`)
  })
  throw new Error("Environment variables validation failed.")
}

export default {
  mongoUri: envVars.MONGO_URI,
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
}
