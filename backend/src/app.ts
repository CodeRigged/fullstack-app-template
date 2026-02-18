import express from "express"
import mongoose from "mongoose"
import swaggerUi from "swagger-ui-express"

import todoRoutes from "~/routes/todoRoutes"

import swaggerDocument from "../openapiv3.json" assert { type: "json" }
import { applyMiddleware } from "./app.middleware"

const app = express()
applyMiddleware(app)

// Health check endpoint
app.get("/health", async (_req, res) => {
  // #swagger.tags = ['ApiHealth']
  if (!mongoose.connection.readyState) {
    return res.status(503).json({ status: "db not ready" })
  }
  res.json({ status: "ok" })
})

// API docs endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Todos API
app.use("/todos", todoRoutes)

export default app
