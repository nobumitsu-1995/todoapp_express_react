import React from 'react'
import styled from 'styled-components';

type Props = {
  menuItems: {
    id: number;
    item: React.ReactNode
  }[]
}

const MenuList: React.FC<Props> = ({ menuItems }) => {
  return (
    <StyledUl>
      {menuItems.map(menuItem => {
        return (
          <li key={menuItem.id}>
            {menuItem.item}
          </li>
        )
      })}
    </StyledUl>
  )
}

export default MenuList

const StyledUl = styled.ul`
  padding: 0;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  list-style-type: none;
`