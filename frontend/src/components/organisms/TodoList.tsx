import React from 'react'
import { ModalContextProvider, useModalContext } from '../../utils/functions/ModalContext'
import { useTodosContext } from '../../utils/functions/TodoContext'
import { Button, Title } from '../atoms'
import { TableItem } from '../molecules'
import ModalBody from './ModalBody'
import ModalButton from './ModalButton'

const TodoList: React.FC = () => {
  const { todos } = useTodosContext();

  const menuItems = [
    {
      id: 1,
      item: <ModalButton 
        children="edit"
        />
    },
    {
      id: 2,
      item: <Button 
        children="delete"
        onClick={()=>alert("Delete Todo!")}
      />
    },
  ]

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
                  todo={todo} 
                  menuItems={menuItems}                />
                  )
                })}
            </tbody>
          </table>
        : "nothing to do!!"}
      </section>
      <ModalBody children={<p>ko</p>}/>
    </ModalContextProvider>
  )
}

export default TodoList