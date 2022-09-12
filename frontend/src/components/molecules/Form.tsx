import React from 'react'
import { Input } from '../atoms'

type Props = {
  inputItems: {
    name: string;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  }[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<Props> = ({
  inputItems,
  onSubmit
}) => {
  return (
    <form
      onSubmit={onSubmit}
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
      <input 
        value='作成'
        type='submit'
      />
    </form>
  )
}

export default Form
