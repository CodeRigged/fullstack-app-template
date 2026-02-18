import logger from "@logger"
import { Request, Response } from "express"
import { validateTodo } from "shared/validation"

import * as todoService from "~/services/todoService"

/**
 * Controller to handle fetching all todos and sending them in the response.
 * Responds with a JSON array of todos or an error message.
 * @route GET /todos
 */
export const getTodos = async (_req: Request, res: Response) => {
  try {
    const todos = await todoService.getAllTodos()
    res.json({ todos })
  } catch (err) {
    logger.error({ err }, "Error fetching todos")
    res.status(500).json({ error: "Failed to fetch todos" })
  }
}

/**
 * Controller to handle creating a new todo from request body.
 * Returns the created todo or an error message.
 * @route POST /todos
 */ export const createTodo = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateTodo(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    } else if (value.text) {
      const todo = await todoService.createTodo(value.text)
      res.status(201).json({ todo })
    }
  } catch (err) {
    logger.error({ err }, "Error creating todo")
    res.status(500).json({ error: "Failed to create todo" })
  }
}

/**
 * Controller to update a todo's text by ID.
 * Returns the updated todo or a not found/error message.
 * @route PUT /todos/:id
 */
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { error, value } = validateTodo(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    } else if (value.text) {
      const updatedTodo = await todoService.updateTodo(id, value.text)
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" })
      }
      res.json({ message: "Todo updated", todo: updatedTodo })
    }
  } catch (err) {
    logger.error({ err }, "Error updating todo")
    res.status(500).json({ error: "Failed to update todo" })
  }
}

/**
 * Controller to delete a todo by its ID.
 * Returns the deleted todo or a not found/error message.
 * @route DELETE /todos/:id
 */
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedTodo = await todoService.deleteTodo(id)
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" })
    }
    res.json({ message: "Todo deleted", todo: deletedTodo })
  } catch (err) {
    logger.error({ err }, "Error deleting todo")
    res.status(500).json({ error: "Failed to delete todo" })
  }
}
