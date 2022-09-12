import React from 'react'
import { TodosProvider } from '../../utils/functions/TodoContext';
import Todo from '../templates/Todo'

const Todos: React.FC = () => {

  return (
    <TodosProvider>
      <Todo />
    </TodosProvider>
  )
}

export default Todos