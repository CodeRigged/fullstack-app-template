import CancelIcon from "@mui/icons-material/Cancel"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Todo } from "shared/types"
import { validateTodo } from "shared/validation"

import { useErrorStore } from "~/stores/state-handlers"
import { useTodoStore } from "~/stores/todo-store"

interface TodoListItemProps {
  todo: Todo
}

const TodoListItem = ({ todo }: TodoListItemProps) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editText, setEditText] = useState<string>(todo.text)
  const { deleteTodo, isPending, updateTodo } = useTodoStore()
  const { setError } = useErrorStore()

  const handleSaveEdit = async () => {
    // Validate before sending to API
    const { error, value } = validateTodo({ text: editText.trim() })
    if (error) {
      setError(error)
      return
    } else if (value.text) {
      await updateTodo(todo._id, { text: value.text }).catch(setError)
      setEditMode(false)
    }
  }

  const handleCancelEdit = () => {
    setEditMode(false)
    setEditText(todo.text)
  }

  const handleDelete = async () => {
    await deleteTodo(todo._id).catch(setError)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        {editMode ? (
          <TextField
            value={editText}
            onChange={e => setEditText(e.target.value)}
            size="small"
            fullWidth
            autoFocus
            onKeyDown={e => {
              if (e.key === "Enter") handleSaveEdit()
              if (e.key === "Escape") handleCancelEdit()
            }}
            disabled={isPending}
          />
        ) : (
          <Typography>{todo.text}</Typography>
        )}
      </CardContent>
      <CardActions>
        {editMode ? (
          <>
            <Button
              size="small"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveEdit}
              disabled={isPending || !editText.trim()}
            >
              Save
            </Button>
            <Button
              size="small"
              color="inherit"
              startIcon={<CancelIcon />}
              onClick={handleCancelEdit}
              disabled={isPending}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              size="small"
              color="info"
              startIcon={<EditIcon />}
              onClick={() => setEditMode(true)}
              disabled={isPending}
            >
              Edit
            </Button>
            <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={handleDelete} disabled={isPending}>
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  )
}

export default TodoListItem
