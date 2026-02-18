import Joi, { ValidationResult } from "joi"

import { Todo } from "../../types/index.js"

const todoSchema = Joi.object({
  completed: Joi.boolean().default(false),
  text: Joi.string().required(),
})

export function validateTodo(todo: Partial<Todo>): ValidationResult<Partial<Todo>> {
  return todoSchema.validate(todo)
}
