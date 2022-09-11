import React from 'react'
import styled from 'styled-components'

const Input = ({
  label,
  name,
  value,
  onChange,
  className
}) => {
  return (
    <label
      className={className}
      htmlFor={name}
    >
      {label}
      <StyledInput
        id={name}
        name={name}
        value={value}
        placeholder={name}
        onChange={onChange}
      />
    </label>
  )
}

export default Input

const StyledInput = styled.input`

`