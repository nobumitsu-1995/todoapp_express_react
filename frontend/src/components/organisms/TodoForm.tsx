import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { client } from '../../utils/functions/axios';
import { useTodosContext } from '../../utils/functions/TodoContext';
import { Title } from '../atoms'
import { Form } from '../molecules'

const TodoForm: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { todos, setTodos } = useTodosContext()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    client.post('/todos', {
      content: content
    })
    .then((todo: any) => {
      setContent("");
      setTodos([...todos, todo.data])
      navigate("/todos")
    })
    .catch((error: any) => {
      console.error(error);
    })
  }

  return (
    <section>
      <Title
        text="Create Todo"
      />
      <Form 
        inputItems={inputItems}
        onSubmit={(event)=>{onSubmit(event)}}
      />
    </section>
  )
}

export default TodoForm