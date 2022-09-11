import React, { useState } from 'react'
import { client } from '../../functions/axios';
import { Title } from '../atoms';
import { Form } from '../molecules';

const UserForm = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: ""
  })

  const handleInputChange = (event) => {
    const { value } = event.target;
    setUser(value)
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

  const onSubmit = () => {
    client.post('/user', user)
      .then(user => {
        
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <section>
      <Title 
        text="Create User"
      />
      <Form
        action="/user"
        inputItems={inputItems}
        onSubmit={onSubmit}
      />
    </section>
  )
}

export default UserForm