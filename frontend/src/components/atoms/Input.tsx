import React from 'react'
import styled from 'styled-components'

type InputProps = Omit<JSX.IntrinsicElements["input"], "ref">;
type Props = InputProps & {
  className?: string;
  name: string;
  label: string;
  value: string;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<Props> = ({
  label,
  name,
  value,
  error,
  onChange,
  className,
  ...inputProps
}) => {
  return (
    <StyledLabel
      className={className}
      htmlFor={name}
    >
      {label}{error && <StyledSpan>{error}</StyledSpan>}
      <StyledInput
        id={name}
        name={name}
        value={value}
        placeholder={name}
        onChange={onChange}
        {...inputProps}
      />
    </StyledLabel>
  )
}

export default Input

const StyledLabel = styled.label`
  position: relative;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
`

const StyledInput = styled.input`
  padding: 5px 15px;
  width: 100%;
  box-sizing: border-box;
  font-size: 1.4rem;
`

const StyledSpan = styled.span`
  position: absolute;
  right: 0;
  text-align: right;
  font-size: 1rem;
  font-weight: bold;
  color: #E63946;
`