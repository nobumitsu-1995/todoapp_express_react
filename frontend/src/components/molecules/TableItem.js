import React from 'react'
import MenuList from './MenuList'

const TableItem = ({
  heading,
  data,
  menuItems
}) => {
  return (
    <tr>
      <th>
        {heading}
      </th>
      <td>
        {data}
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