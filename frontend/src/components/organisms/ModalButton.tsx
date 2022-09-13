import React from 'react'
import { useModalContext } from '../../utils/functions/ModalContext';
import { Button } from '../atoms';

type Props = {
  children: React.ReactNode | string;
}

const ModalButton: React.FC<Props> = ({ children }) => {
  const { isOpen, setIsOpen } = useModalContext()

  return (
    <Button
      children={children}
      onClick={() => {setIsOpen(!isOpen)}}
    />
  )
}

export default ModalButton