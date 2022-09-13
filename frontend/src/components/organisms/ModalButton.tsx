import React from 'react'
import { useModalContext } from '../../utils/functions/ModalContext';
import { Button } from '../atoms';

type Props = {
  children: React.ReactNode | string;
  id: string;
}

const ModalButton: React.FC<Props> = ({ children, id }) => {
  const { isOpen, setIsOpen, setModalId } = useModalContext()
  const handleClick = () => {
    setIsOpen(!isOpen)
    setModalId(id)
  }
  return (
    <Button
      children={children}
      onClick={handleClick}
    />
  )
}

export default ModalButton