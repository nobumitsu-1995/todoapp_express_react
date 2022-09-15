import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { client } from '../../utils/functions/axios';
import { useModalContext } from '../../utils/functions/ModalContext';
import { validateTodo } from '../../utils/functions/Todo';
import { useTodosContext } from '../../utils/functions/TodoContext';
import { Title } from '../atoms'
import { Form } from '../molecules'

const TodoModal: React.FC = () => {
  const navigate = useNavigate();
  const { modalId, setIsOpen, isOpen } = useModalContext();
  const { todos, setTodos } = useTodosContext();
  const [error, setError] = useState("");
  const [todo, setTodo] = useState({_id: "", content: ""})

  useEffect(() => {
    const _todo = todos.find(todo => todo._id === modalId)
    _todo && setTodo(_todo)
  }, [modalId])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value })
  }

  const inputItems = [
    {
      name: "content",
      label: "Todo Content",
      value: todo.content,
      error: error,
      onChange: handleInputChange,
      type: "text"
    }
  ]

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateTodo(todo.content, setError)) return
    
    client.patch(`/todos/${modalId}`, todo)
    .then((todo: any) => {
      setTodos([...todos.filter(t => t._id !== modalId), todo.data])
      setError("");
      setIsOpen(!isOpen)
      navigate("/todos")
    })
    .catch((error: any) => {
      console.error(error);
    })
  }

  return (
    <section>
      <Title
        text="Edit Todo"
      />
      <Form 
        inputItems={inputItems}
        onSubmit={(event)=>{onSubmit(event)}}
        buttonText="Update"
      />
    </section>
  )
}

export default TodoModal