import React, { useEffect } from 'react'
import styled from 'styled-components'
import { client } from '../../utils/functions/axios';
import { useTodosContext } from '../../utils/functions/TodoContext';
import TodoForm from '../organisms/TodoForm'
import TodoList from '../organisms/TodoList'

const Todo: React.FC = () => {
  const { setTodos } = useTodosContext();

  useEffect(() => {
    client.get(`/todos/index/${sessionStorage.getItem('id')}`).then((result: any) => {
      setTodos(result.data)
    })
    .catch((error: any) => {
      console.log(error);
    })
  }, [setTodos])
  
  return (
    <StyledMain>
      <StyledDiv>
        <TodoForm/>
        <TodoList/>
      </StyledDiv>
    </StyledMain>
  )
}

export default Todo

const StyledMain = styled.main`
  padding-top: 75px;
`

const StyledDiv = styled.div`
  margin: 0 auto;
  width: 800px;
  max-width: calc(100vw - 20px);
`