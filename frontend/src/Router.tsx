import React from 'react'
import { Routes, Route } from 'react-router'
import { Todos, Top, User, UserEdit } from './components/pages'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Top/>}/>
      <Route path="/todos" element={<Todos/>}/>
      <Route path="/user" element={<User/>}/>
      <Route path="/user/edit" element={<UserEdit/>}/>      
    </Routes>
  )
}

export default Router