import React, { useEffect } from 'react'
import { client } from '../../utils/functions/axios';
import { useTodosContext } from '../../utils/functions/TodoContext';
import TodoForm from '../organisms/TodoForm'
import TodoList from '../organisms/TodoList'

const Todo: React.FC = () => {
  const { setTodos } = useTodosContext();

  useEffect(() => {
    client.get('/todos').then((result: any) => {
      setTodos(result.data)
    })
    .catch((error: any) => {
      console.log(error);
    })
  }, [setTodos])
  
  return (
    <main>
      <TodoForm/>
      <TodoList/>
    </main>
  )
}

export default Todo