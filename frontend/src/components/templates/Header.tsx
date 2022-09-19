import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Anchor } from '../atoms'

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.removeItem('id')
    if (!sessionStorage.getItem('id')) {
      navigate("/signin")
    }
  }

  return (
    <StyledHeader>
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
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
`

const StyledNav = styled.nav`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ccc;
`