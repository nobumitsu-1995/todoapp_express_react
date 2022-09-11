import React from 'react'
import MenuList from './MenuList'

const TableItem = ({
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