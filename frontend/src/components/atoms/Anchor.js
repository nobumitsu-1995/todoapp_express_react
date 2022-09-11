import React from 'react'
import styled from 'styled-components'

const Anchor = ({
  text,
  onClick
}) => {
  return (
    <StyledA
      onClick={onClick}
    >
      {text}
    </StyledA>
  )
}

export default Anchor

const StyledA = styled.a`
  text-decoration: underline;
  font-size: 1.2rem;
  font-weight: bold;
  color: blue;
`