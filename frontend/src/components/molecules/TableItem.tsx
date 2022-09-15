import React from 'react'
import styled from 'styled-components';
import { client } from '../../utils/functions/axios';
import { useTodosContext } from '../../utils/functions/TodoContext';
import { Todo } from '../../utils/types/todo'
import { Anchor } from '../atoms';
import ModalButton from '../organisms/ModalButton';
import MenuList from './MenuList'

type Props = {
  index: number;
  todo: Todo;
}

const TableItem: React.FC<Props> = ({
  index,
  todo,
}) => {
  const { todos, setTodos } = useTodosContext();   

  const handleClick = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Delete Todo")) {
      client.delete(`/todos/${todo._id}`)
        .then(() => {
          setTodos([...todos.filter(t => t._id !== todo._id)])
        })
        .catch((error: any) => {
          console.error(error);
        })
    }
  }

  const menuItems = [
    {
      id: 1,
      item: <ModalButton
        children="edit"
        id={todo._id}
      />
    },
    {
      id: 2,
      item: <Anchor
        children="delete"
        onClick={handleClick}
      />
    },
  ]

  return (
    <StyledTr>
      <StyledTh>
        {index}
      </StyledTh>
      <StyledTd1>
        {todo.content}
      </StyledTd1>
      <StyledTd2>
        <MenuList
          menuItems={menuItems}
        />
      </StyledTd2>
    </StyledTr>
  )
}

export default TableItem

const StyledTr = styled.tr`
  background: #ccc;

  &:nth-child(odd) {
    background: #eee;
  }
`

const StyledTh = styled.th`
  padding: 0 10px;
  width: 5%
`

const StyledTd1 = styled.td`
  padding: 0 10px;
  width: 70%
`

const StyledTd2 = styled.td`
  padding: 0 10px;
  width: 25%
`