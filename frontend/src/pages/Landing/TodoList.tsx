import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect } from "react"

import { useErrorStore } from "~/stores/state-handlers"
import { useTodoStore } from "~/stores/todo-store"

import TodoForm from "./TodoForm"
import TodoItems from "./TodoItems"

const TodoList = () => {
  const { fetchTodos, isPending, text: pendingMessage } = useTodoStore()
  const { setError } = useErrorStore()

  useEffect(() => {
    fetchTodos().catch(setError)
  }, [fetchTodos, setError])

  return (
    <Box maxWidth={480} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom align="center">
        Todo List
      </Typography>
      <TodoForm />
      {isPending && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress size={32} />
          {pendingMessage && (
            <Typography ml={2} color="text.secondary">
              {pendingMessage}
            </Typography>
          )}
        </Box>
      )}
      <TodoItems />
    </Box>
  )
}

export default TodoList
