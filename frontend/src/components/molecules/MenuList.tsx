import React from 'react'

type Props = {
  menuItems: {
    id: number;
    item: React.ReactNode
  }[]
}

const MenuList: React.FC<Props> = ({ menuItems }) => {
  return (
    <ul>
      {menuItems.map(menuItem => {
        return (
          <li key={menuItem.id}>
            {menuItem.item}
          </li>
        )
      })}
    </ul>
  )
}

export default MenuList