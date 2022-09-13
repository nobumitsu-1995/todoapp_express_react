import React from 'react'
import { client } from '../../utils/functions/axios';
import { useTodosContext } from '../../utils/functions/TodoContext';
import { Todo } from '../../utils/types/todo'
import { Button } from '../atoms';
import ModalButton from '../organisms/ModalButton';
import MenuList from './MenuList'

type Props = {
  todo: Todo;
}

const TableItem: React.FC<Props> = ({
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
      item: <Button
        children="delete"
        onClick={handleClick}
      />
    },
  ]

  return (
    <tr>
      <th>
        {todo._id}
      </th>
      <td>
        {todo.content}
      </td>
      <td>
        <MenuList
          menuItems={menuItems}
        />
      </td>
    </tr>
  )
}

export default TableItem