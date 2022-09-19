import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TopTemplate: React.FC = () => {
  return (
    <main>
      <StyledSection>
        <h1>Todo Application</h1>
        <StyledP> You should <Link to="/">create user</Link> to start this TodoApplication!</StyledP>
        <StyledP> If you already have account, You may log in <Link to='/signin'>here</Link>!</StyledP>
        <Outlet />
      </StyledSection>
    </main>
  )
}

export default TopTemplate

const StyledSection = styled.section`
  margin: 0 auto;
  width: 800px;
  max-width: calc(100vw - 20px);
`

const StyledP = styled.p`
  margin: 0;
`