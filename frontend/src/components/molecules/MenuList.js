import React from 'react'
import { Anchor } from '../atoms'

const MenuList = ({
  id
}) => {
  const menuItems = [
    {
      text: "edit",
      onClick: () => {
        
      }
    },
    {
      text: "delete",
      onClick: () => {

      }
    },
  ]


  return (
    <ul>
      {menuItems.map(menuItem => {
        return (
          <li key={`${menuItem.text}-${id}`}>
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