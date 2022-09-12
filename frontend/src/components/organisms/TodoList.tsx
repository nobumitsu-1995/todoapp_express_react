import React from 'react'
import { useTodosContext } from '../../utils/functions/TodoContext'
import { Title } from '../atoms'
import { TableItem } from '../molecules'

const TodoList: React.FC = () => {
  const { todos } = useTodosContext();

  return (
    <section>
      <Title text='Todo List'/>
      {todos.length > 0 
      ? <table>
          <tbody>
            {todos.map(todo => {
              return (
                <TableItem
                todo={todo}
                />
                )
              })}
          </tbody>
        </table>
      : "nothing to do!!"}
    </section>
  )
}

export default TodoList