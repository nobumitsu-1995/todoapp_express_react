import React, { useState }  from 'react'
import { useNavigate } from 'react-router'
import { client } from '../../utils/functions/axios';
import { validateUser } from '../../utils/functions/User';
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
      name: "email",
      label: "Email",
      value: user.email,
      error: error.email,
      onChange: handleInputChange,
      type: "email"
    },
    {
      name: "password",
      label: "Password",
      value: user.password,
      error: error.password,
      onChange: handleInputChange,
      type: "password"
    },
  ]
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateUser(user, setError)) return
    
    client.post('/user/login', user)
      .then((res) => {
        sessionStorage.setItem('id', res.data.id)
        if (sessionStorage.getItem('id')) {
          navigate("/todos")
        }
      })
      .catch((error: any) => {
        navigate("/signin")
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