import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { client } from '../../utils/functions/axios';
import { validateTodo } from '../../utils/functions/Todo';
import { useTodosContext } from '../../utils/functions/TodoContext';
import { Title } from '../atoms'
import { Form } from '../molecules'

const TodoForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
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
      error: error,
      onChange: handleInputChange,
      type: "text"
    }
  ]

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateTodo(content, setError)) return

    client.post('/todos', {
      content: content
    })
    .then((todo: any) => {
      setContent("");
      setError("");
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
        buttonText="Create"
      />
    </section>
  )
}

export default TodoForm