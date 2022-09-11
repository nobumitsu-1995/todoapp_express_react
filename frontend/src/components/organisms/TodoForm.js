import React, { useState } from 'react'
import { client } from '../../functions/axios';
import { Title } from '../atoms'
import { Form } from '../molecules'

const TodoForm = () => {
  const [content, setContent] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setContent(value)
  }

  const inputItems = [
    {
      name: "content",
      label: "Todo Content",
      value: content,
      onChange: handleInputChange,
    }
  ]

  const onSubmit = () => {
    client.post('/todos', {
      content: content
    })
    .then(todo => {
      setContent("");
    })
    .catch(error => {
      console.error(error);
    })
  }

  return (
    <section>
      <Title
        text="Create Todo"
      />
      <Form 
        action="/todo"
        inputItems={inputItems}
        onSubmit={onSubmit}
      />
    </section>
  )
}

export default TodoForm