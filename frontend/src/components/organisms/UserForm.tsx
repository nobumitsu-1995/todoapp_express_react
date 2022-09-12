import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { client } from '../../utils/functions/axios';
import { Title } from '../atoms';
import { Form } from '../molecules';

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: ""
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // setUser(value)
  }

  const inputItems = [
    {
      name: "name",
      label: "Your Name",
      value: user.name,
      onChange: handleInputChange,
    },
    {
      name: "password",
      label: "Password",
      value: user.password,
      onChange: handleInputChange,
    },
    {
      name: "email",
      label: "Email",
      value: user.email,
      onChange: handleInputChange,
    },
  ]

  const onSubmit = async () => {
    await client.post('/user', {
      body: user
    })
      .then(() => {
        navigate("/todos")
      })
      .catch(() => {
        navigate("/todos")
      })
  }

  return (
    <section>
      <Title 
        text="Create User"
      />
      <Form
        inputItems={inputItems}
        onSubmit={onSubmit}
      />
    </section>
  )
}

export default UserForm