import React from 'react'

type Props = {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string;
}

const Input: React.FC<Props> = ({
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
      <input
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