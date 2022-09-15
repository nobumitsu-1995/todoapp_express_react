import React from 'react'
import styled from 'styled-components';
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
        ? <StyledTable>
            <tbody>
              <tr>
                <th>Id</th>
                <th colSpan={2}>Content</th>
              </tr>
              {todos.map((todo, index) => {
                return (
                  <TableItem
                    key={todo._id}
                    index={index + 1}
                    todo={todo} 
                  />
                )
              })}
            </tbody>
          </StyledTable>
        : "nothing to do!!"}
      </section>
      <ModalBody children={<TodoModal />}/>
    </ModalContextProvider>
  )
}

export default TodoList

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`