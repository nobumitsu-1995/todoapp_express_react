import React from 'react'
import { Anchor } from '../atoms'

const MenuList = ({
  menuItems
}) => {
  return (
    <ul>
      {menuItems.map(menuItem => {
        return (
          <li key={menuItem.text}>
            <Anchor
              text={menuItem.text}
              onClick={menuItem.onClick}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default MenuList