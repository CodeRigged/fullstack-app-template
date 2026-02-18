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
  /*
    #swagger.tags = ['Todos']
    #swagger.summary = 'Get all todos'
    #swagger.description = 'Returns a list of all todo items in the database.'
    #swagger.responses[200] = {
      description: 'List of todos',
      schema: { todos: [ { _id: 'abc123', text: 'Buy milk', completed: false } ] }
    }
    #swagger.responses[500] = {
      description: 'Failed to fetch todos',
      schema: { error: 'Failed to fetch todos' }
    }
  */
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
 */
export const createTodo = async (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Todos']
  #swagger.summary = 'Create a new todo'
  #swagger.description = 'Creates a new todo item with the provided text and returns the created todo.'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/TodoInput" },
        example: { text: "NewTodo" }
      }
    }
  }
  #swagger.responses[201] = {
    description: 'Todo created',
    schema: {
      todo: { $ref: '#/components/schemas/Todo' }
    },
    examples: {
      'application/json': {
        value: {
          todo: {
            completed: false,
            text: "NewTodo",
            _id: "6995e3399ecb6f0efa9b0a09",
            createdAt: "2026-02-18T16:05:14.006Z",
            updatedAt: "2026-02-18T16:05:14.006Z",
            __v: 0
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Validation error',
    schema: { error: 'Text is required' }
  }
  #swagger.responses[500] = {
    description: 'Failed to create todo',
    schema: { error: 'Failed to create todo' }
  }
*/
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
  /*
  #swagger.tags = ['Todos']
  #swagger.summary = 'Update a todo'
  #swagger.description = 'Updates the text of an existing todo item by its ID and returns the updated todo.'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/TodoInput" },
        example: { text: "NewTodo" }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Todo updated',
    schema: {
      message: "Todo updated",
      todo: { $ref: '#/components/schemas/Todo' }
    },
    examples: {
      'application/json': {
        value: {
          message: "Todo updated",
          todo: {
            _id: "6995e3399ecb6f0efa9b0a09",
            completed: false,
            text: "NewTodoEdit",
            createdAt: "2026-02-18T16:05:14.006Z",
            updatedAt: "2026-02-18T16:05:41.436Z",
            __v: 0
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Validation error',
    schema: { error: 'Text is required' }
  }
  #swagger.responses[404] = {
    description: 'Todo not found',
    schema: { error: 'Todo not found' }
  }
  #swagger.responses[500] = {
    description: 'Failed to update todo',
    schema: { error: 'Failed to update todo' }
  }
*/
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
  /*
    #swagger.tags = ['Todos']
    #swagger.summary = 'Delete a todo'
    #swagger.description = 'Deletes a todo item by its ID and returns the deleted todo.'
    #swagger.responses[200] = {
      description: 'Todo deleted',
      schema: { message: 'Todo deleted', todo: { _id: 'abc123', text: 'Buy milk', completed: false } }
    }
    #swagger.responses[404] = {
      description: 'Todo not found',
      schema: { error: 'Todo not found' }
    }
    #swagger.responses[500] = {
      description: 'Failed to delete todo',
      schema: { error: 'Failed to delete todo' }
    }
  */
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
