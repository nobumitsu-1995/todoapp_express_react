import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode | string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<Props> = ({
  children,
  onClick
}) => {
  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default Button

const StyledButton = styled.button`
  padding: 10px 0;
  background-color: #7c83cc;
  border: 1px solid #7c83cc;
  border-radius: 27px;
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  transition: opacity 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 0.7
  }
`