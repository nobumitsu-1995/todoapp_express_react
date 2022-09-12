import React from 'react'
import UserForm from '../organisms/UserForm'

const TopTemplate: React.FC = () => {
  return (
    <main>
      <section>
        <h1>Todo Application</h1>
        <p> You should create user to start this TodoApplication!</p>
        <UserForm />
      </section>
    </main>
  )
}

export default TopTemplate