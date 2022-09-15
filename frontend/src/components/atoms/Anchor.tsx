import React from 'react'
import styled from 'styled-components';

type Props = {
  children: React.ReactNode | string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

const Anchor: React.FC<Props> = ({
  children,
  onClick
}) => {
  return (
    <StyledA
      onClick={(event)=>onClick(event)}
    >
      {children}
    </StyledA>
  )
}

export default Anchor

const StyledA = styled.a`
  text-decoration: underline;
  font-size: 1.2rem;
  font-weight: bold;
  color: #7c83cc;
  transition: opacity 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`