import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { client } from '../../utils/functions/axios';
import { validateUser } from '../../utils/functions/User';
import { Title } from '../atoms';
import { Form } from '../molecules';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    name: "",
    password: "",
    email: "",
  })
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: ""
  })
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value })
  }
  const inputItems = [
    {
      name: "name",
      label: "Your Name",
      value: user.name,
      error: error.name,
      onChange: handleInputChange,
      type: "text"
    },
    {
      name: "password",
      label: "Password",
      value: user.password,
      error: error.password,
      onChange: handleInputChange,
      type: "password"
    },
    {
      name: "email",
      label: "Email",
      value: user.email,
      error: error.email,
      onChange: handleInputChange,
      type: "email"
    },
  ]
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateUser(user, setError)) return
    
    client.post('/user', user)
      .then(() => {
        navigate("/todos")
      })
      .catch((error: any) => {
        if(error.response.data.error.name === "UserExistsError") {
          setError({
            name: "",
            password: "",
            email: "Email is already used"
          })
        }
        
        navigate("/")
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
        buttonText="Sign Up"
      />
    </section>
  )
}

export default SignupForm