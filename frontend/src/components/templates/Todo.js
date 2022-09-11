import React from 'react'
import TodoForm from '../organisms/TodoForm'
import TodoList from '../organisms/TodoList'

const Todo = ({
  todos
}) => {
  return (
    <main>
      <TodoForm/>
      <TodoList
        todos={todos}
      />
    </main>
  )
}

export default Todo