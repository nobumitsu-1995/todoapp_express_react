import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
}

const Button: React.FC<Props> = ({
  children,
  onClick
}) => {
  return (
    <StyledButton onClick={()=>onClick}>
      {children}
    </StyledButton>
  )
}

export default Button

const StyledButton = styled.button`
  background: blue;
  border-radius: 15px;
  height: 30px;
  padding: 10px 15px;
  color: white;
  font-weight: bold;
  font-size: 1.6rem
`