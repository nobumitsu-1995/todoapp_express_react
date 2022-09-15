import React from 'react'
import styled from 'styled-components'
import SigninForm from '../organisms/SigninForm'
import SignupForm from '../organisms/SignupForm'

const TopTemplate: React.FC = () => {
  return (
    <main>
      <StyledSection>
        <h1>Todo Application</h1>
        <StyledP> You should create user to start this TodoApplication!</StyledP>
        <StyledP> If you already have account, You may log in!  </StyledP>
        <StyledDiv>
          <SignupForm />
          <SigninForm />
        </StyledDiv>
      </StyledSection>
    </main>
  )
}

export default TopTemplate

const StyledSection = styled.section`
  margin: 0 auto;
  width: 1200px;
  max-width: calc(100vw - 20px);
`

const StyledP = styled.p`
  margin: 0;
`

const StyledDiv = styled.div`
  display: grid;
  gap: 70px;
  grid-template-columns: 1fr 1fr;
`