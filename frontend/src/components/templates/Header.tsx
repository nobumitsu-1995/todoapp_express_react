import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Anchor } from '../atoms'

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.removeItem('id')
    navigate("/signin")
  }

  return (
    <header>
      <StyledNav>
        <h1>Todo App</h1>
        {sessionStorage.getItem('id') 
          ? <Anchor 
              children="Sign Out" 
              onClick={handleClick} 
            />
          : <Link to="/signin">Sign In</Link>
        }
      </StyledNav>
    </header>
  )
}

export default Header

const StyledNav = styled.nav`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ccc;
`