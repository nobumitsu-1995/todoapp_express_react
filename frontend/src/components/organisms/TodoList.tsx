import React from 'react'
import { ModalContextProvider } from '../../utils/functions/ModalContext'
import { useTodosContext } from '../../utils/functions/TodoContext'
import { Title } from '../atoms'
import { TableItem } from '../molecules'
import ModalBody from './ModalBody'
import TodoModal from './TodoModal'

const TodoList: React.FC = () => {
  const { todos } = useTodosContext();

  return (
    <ModalContextProvider>
      <section>
        <Title text='Todo List'/>
        {todos.length > 0 
        ? <table>
            <tbody>
              {todos.map(todo => {
                return (
                  <TableItem
                    key={todo._id}
                    todo={todo} 
                  />
                )
              })}
            </tbody>
          </table>
        : "nothing to do!!"}
      </section>
      <ModalBody children={<TodoModal />}/>
    </ModalContextProvider>
  )
}

export default TodoList