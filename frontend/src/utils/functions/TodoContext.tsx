import React, { createContext, useContext, useMemo, useState } from "react"
import { Todo } from "../types/todo"

type TodoContextType = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoContext = createContext<TodoContextType>({} as TodoContextType)

export const useTodosContext = () => {
  return useContext(TodoContext)
}

export const TodosProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [todos, setTodos] = useState([{content: "", _id: ""}])

  const value = useMemo(() => {
    return {
      todos, setTodos
    }
  }, [todos, setTodos])

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}