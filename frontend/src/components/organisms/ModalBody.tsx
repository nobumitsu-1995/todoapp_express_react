import React from 'react'
import styled from 'styled-components'
import { useModalContext } from '../../utils/functions/ModalContext'

type Props = {
  children: React.ReactNode
}

const ModalBody: React.FC<Props> = ({ children }) => {
  const { isOpen, setIsOpen } = useModalContext()

  return (
    <Overray isOpen={isOpen} onClick={() => {setIsOpen(false)}}>
      <Modal onClick={(e) => e.stopPropagation()}>
        {children}
      </Modal>
    </Overray>
  )
}

export default ModalBody

const Overray = styled.div<{isOpen: boolean}>`
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({isOpen}) => {return !isOpen && "none"}};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh
`

const Modal = styled.div`
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 10px;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 5;
  max-width: 90vw;
  width: 800px;
  height: 50vh;
`