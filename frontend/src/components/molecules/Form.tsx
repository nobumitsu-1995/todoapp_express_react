import React from 'react'
import styled from 'styled-components'
import { Input } from '../atoms'

type Props = {
  inputItems: {
    name: string;
    label: string;
    value: string;
    error: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    type: string;
  }[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
}

const Form: React.FC<Props> = ({
  inputItems,
  onSubmit,
  buttonText
}) => {
  return (
    <StyledForm
      onSubmit={onSubmit}
    > 
      {inputItems.map(inputItem => {
        return (
          <Input
            key={inputItem.name}
            name={inputItem.name}
            label={inputItem.label}
            value={inputItem.value}
            error={inputItem.error}
            onChange={inputItem.onChange}
            type={inputItem.type}
          />
        )
      })}
      <StyledInput 
        value={buttonText}
        type='submit'
      />
    </StyledForm>
  )
}

export default Form

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px
`

const StyledInput = styled.input`
  margin-top: 20px;
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