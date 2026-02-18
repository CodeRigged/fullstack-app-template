import type { Todo } from "shared/types"

import { ObjectId } from "mongodb"
import request from "supertest"
import { afterEach, describe, expect, it, vi } from "vitest"

import app from "~/app"
import { ITodo } from "~/models/Todo"
import * as todoService from "~/services/todoService"

const mockTodo = (overrides: Partial<Todo> = {}): Todo => ({
  _id: new ObjectId().toHexString() as unknown as ObjectId,
  completed: false,
  text: "Test Todo",
  ...overrides,
})

describe("todoController (via HTTP)", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // -----------------------
  // GET /todos
  // -----------------------
  describe("GET /todos", () => {
    it("returns todos from the service", async () => {
      const todos = [mockTodo()]
      vi.spyOn(todoService, "getAllTodos").mockResolvedValue(todos as ITodo[])

      const res = await request(app).get("/todos")

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ todos })
      expect(todoService.getAllTodos).toHaveBeenCalled()
    })

    it("returns empty array if no todos exist", async () => {
      vi.spyOn(todoService, "getAllTodos").mockResolvedValue([])

      const res = await request(app).get("/todos")

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ todos: [] })
    })

    it("handles errors", async () => {
      vi.spyOn(todoService, "getAllTodos").mockRejectedValue(new Error("fail"))

      const res = await request(app).get("/todos")

      expect(res.status).toBe(500)
      expect(res.body).toEqual({ error: "Failed to fetch todos" })
    })
  })

  // -----------------------
  // POST /todos
  // -----------------------
  describe("POST /todos", () => {
    it("creates a todo and returns it", async () => {
      const todo = mockTodo({ text: "New" })
      vi.spyOn(todoService, "createTodo").mockResolvedValue(todo as ITodo)

      const res = await request(app).post("/todos").send({ text: "New" })

      expect(todoService.createTodo).toHaveBeenCalledWith("New")
      expect(res.status).toBe(201)
      expect(res.body).toEqual({ todo })
    })

    it("returns 400 when text is missing", async () => {
      const res = await request(app).post("/todos").send({})

      expect(res.status).toBe(400)
      expect(res.body.error).toMatch(/"text" is required/i)
    })

    it("handles errors", async () => {
      vi.spyOn(todoService, "createTodo").mockRejectedValue(new Error("fail"))

      const res = await request(app).post("/todos").send({ text: "fail" })

      expect(res.status).toBe(500)
      expect(res.body).toEqual({ error: "Failed to create todo" })
    })
  })

  // -----------------------
  // PUT /todos/:id
  // -----------------------
  describe("PUT /todos/:id", () => {
    it("updates a todo and returns it", async () => {
      const updatedTodo = mockTodo({ text: "Updated" })
      vi.spyOn(todoService, "updateTodo").mockResolvedValue(updatedTodo as ITodo)

      const res = await request(app).put("/todos/1").send({ text: "Updated" })

      expect(todoService.updateTodo).toHaveBeenCalledWith("1", "Updated")
      expect(res.status).toBe(200)
      expect(res.body).toEqual({
        message: "Todo updated",
        todo: updatedTodo,
      })
    })

    it("returns 400 when text is missing", async () => {
      const res = await request(app).put("/todos/1").send({})

      expect(res.status).toBe(400)
      expect(res.body.error).toMatch(/"text" is required/i)
    })

    it("returns 404 if todo not found", async () => {
      vi.spyOn(todoService, "updateTodo").mockResolvedValue(null)

      const res = await request(app).put("/todos/1").send({ text: "Updated" })

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ error: "Todo not found" })
    })

    it("handles errors", async () => {
      vi.spyOn(todoService, "updateTodo").mockRejectedValue(new Error("fail"))

      const res = await request(app).put("/todos/1").send({ text: "fail" })

      expect(res.status).toBe(500)
      expect(res.body).toEqual({ error: "Failed to update todo" })
    })
  })

  // -----------------------
  // DELETE /todos/:id
  // -----------------------
  describe("DELETE /todos/:id", () => {
    it("deletes a todo and returns it", async () => {
      const deletedTodo = mockTodo()
      vi.spyOn(todoService, "deleteTodo").mockResolvedValue(deletedTodo as ITodo)

      const res = await request(app).delete("/todos/1")

      expect(todoService.deleteTodo).toHaveBeenCalledWith("1")
      expect(res.status).toBe(200)
      expect(res.body).toEqual({
        message: "Todo deleted",
        todo: deletedTodo,
      })
    })

    it("returns 404 if todo not found", async () => {
      vi.spyOn(todoService, "deleteTodo").mockResolvedValue(null)

      const res = await request(app).delete("/todos/1")

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ error: "Todo not found" })
    })

    it("handles errors", async () => {
      vi.spyOn(todoService, "deleteTodo").mockRejectedValue(new Error("fail"))

      const res = await request(app).delete("/todos/1")

      expect(res.status).toBe(500)
      expect(res.body).toEqual({ error: "Failed to delete todo" })
    })
  })
})
