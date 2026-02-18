import swaggerAutogen from "swagger-autogen"

const doc = {
  components: {
    schemas: {
      Todo: {
        properties: {
          __v: { example: 0, type: "integer" },
          _id: { example: "6995e3399ecb6f0efa9b0a09", type: "string" },
          completed: { example: false, type: "boolean" },
          createdAt: { example: "2026-02-18T16:05:14.006Z", format: "date-time", type: "string" },
          text: { example: "NewTodo", type: "string" },
          updatedAt: { example: "2026-02-18T16:05:41.436Z", format: "date-time", type: "string" },
        },
        required: ["text"],
        type: "object",
      },
      TodoInput: {
        properties: {
          text: { example: "NewTodo", type: "string" },
        },
        required: ["text"],
        type: "object",
      },
    },
  },
  host: "localhost:5000",
  info: {
    description: "API documentation for the React TypeScript template project",
    title: "React TS Template API",
    version: "1.0.0",
  },
  schemes: ["http"],
}

const outputFile = "./openapiv3.json" // This is the outfile
const endpointsFiles = ["./src/app.ts"]

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc)
