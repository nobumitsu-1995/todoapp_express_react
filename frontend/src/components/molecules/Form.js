import React from 'react'
import styled from 'styled-components'
import { Input } from '../atoms'

const Form = ({
  action,
  inputItems,
  onSubmit
}) => {
  return (
    <form
      action={action}
      onSubmit={onSubmit}
      method="POST"
    > 
      {inputItems.map(inputItem => {
        return (
          <Input
            key={inputItem.name}
            name={inputItem.name}
            label={inputItem.label}
            value={inputItem.value}
            onChange={inputItem.onChange}
          />
        )
      })}
      <StyledInput 
        value='作成'
        type='submit'
      />
    </form>
  )
}

export default Form

const StyledInput = styled.input`

`