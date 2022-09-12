import React from 'react'
import { Todo } from '../../utils/types/todo'
import MenuList from './MenuList'

type Props = {
  todo: Todo
}

const TableItem: React.FC<Props> = ({
  todo
}) => {
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
          id={todo._id}
        />
      </td>
    </tr>
  )
}

export default TableItem