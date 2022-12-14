import React from 'react'
import styled from 'styled-components'

type Props = {
  text: string;
}

const Title: React.FC<Props> = ({
  text
}) => {
  return (
    <StyledH2>
      {text}
    </StyledH2>
  )
}

export default Title

const StyledH2 = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #111;
`