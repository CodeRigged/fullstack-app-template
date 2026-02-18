import { Box, Button, TextField } from "@mui/material"
import { SubmitEventHandler, useState } from "react"
import { Todo } from "shared/types"
import { validateTodo } from "shared/validation"

import { useErrorStore } from "~/stores/state-handlers"
import { useTodoStore } from "~/stores/todo-store"

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState<Todo["text"]>("")
  const { addTodo, isPending } = useTodoStore()
  const { setError } = useErrorStore()

  const handleAdd: SubmitEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    // Validate before sending to API
    const { error, value } = validateTodo({ text: newTodo.trim() })
    if (error) {
      setError(error)
      return
    } else if (value.text) {
      await addTodo(value.text).catch(setError)
      setNewTodo("")
    }
  }

  return (
    <Box component="form" onSubmit={handleAdd} mb={3} display="flex" gap={2}>
      <TextField
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
        disabled={isPending}
        size="small"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" disabled={isPending || !newTodo.trim()}>
        Add
      </Button>
    </Box>
  )
}

export default TodoForm
