import React from 'react'
import { Routes, Route } from 'react-router'
import SigninForm from './components/organisms/SigninForm'
import SignupForm from './components/organisms/SignupForm'
import { Todos, Top, User, UserEdit } from './components/pages'

const Router: React.FC = () => {
  return (
    <Routes>
      {sessionStorage.getItem('id') ? 
        <>
          <Route path="*" element={<Todos/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/user/edit" element={<UserEdit/>}/>  
        </>
        :
        <>
          <Route path="/" element={<Top/>}>
            <Route index element={<SignupForm/>}/>
            <Route path="signin" element={<SigninForm/>}/>
          </Route>
        </>
      }    
    </Routes>
  )
}

export default Router