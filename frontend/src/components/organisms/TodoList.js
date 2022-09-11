import React from 'react'
import { Title } from '../atoms'
import { TableItem } from '../molecules'

const TodoList = ({
  todos
}) => {
  return (
    <section>
      <Title text='Todo List'/>
      {todos 
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