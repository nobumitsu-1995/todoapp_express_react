import React, { useState }  from 'react'
import { useNavigate } from 'react-router'
import { client } from '../../utils/functions/axios';
import { validateSingIn } from '../../utils/functions/User';
import { Title } from '../atoms';
import { Form } from '../molecules';

const SigninForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    password: "",
    email: "",
  })
  const [user, setUser] = useState({
    password: "",
    email: ""
  })
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value })
  }
  const inputItems = [
    {
      name: "SignInEmail",
      label: "Email",
      value: user.email,
      error: error.email,
      onChange: handleInputChange,
      type: "email"
    },
    {
      name: "SignInPassword",
      label: "Password",
      value: user.password,
      error: error.password,
      onChange: handleInputChange,
      type: "password"
    },
  ]
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateSingIn(user, setError)) return
    
    client.post('/signin', user)
      .then(() => {
        navigate("/todos")
      })
      .catch((error: any) => {
        navigate("/")
      })
  }

  return (
    <section>
      <Title 
        text="Sign In"
      />
      <Form
        inputItems={inputItems}
        onSubmit={onSubmit}
        buttonText="Sign In"
      />
    </section>
  )
}

export default SigninForm