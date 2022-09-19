import React from 'react'
import { Routes, Route } from 'react-router'
import SigninForm from './components/organisms/SigninForm'
import SignupForm from './components/organisms/SignupForm'
import { Todos, Top, User, UserEdit } from './components/pages'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Top/>}>
        <Route path="" element={<SignupForm/>}/>
        <Route path="signin" element={<SigninForm/>}/>
      </Route>
      <Route path="/todos" element={<Todos/>}/>
      <Route path="/user" element={<User/>}/>
      <Route path="/user/edit" element={<UserEdit/>}/>      
    </Routes>
  )
}

export default Router