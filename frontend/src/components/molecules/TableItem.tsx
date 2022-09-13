import React from 'react'
import { Todo } from '../../utils/types/todo'
import MenuList from './MenuList'

type Props = {
  todo: Todo;
  menuItems: {
    id: number;
    item: React.ReactNode
  }[]
}

const TableItem: React.FC<Props> = ({
  todo,
  menuItems
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
          menuItems={menuItems}
        />
      </td>
    </tr>
  )
}

export default TableItem