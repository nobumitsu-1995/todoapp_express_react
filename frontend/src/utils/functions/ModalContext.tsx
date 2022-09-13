import React, {createContext, useContext, useMemo, useState} from 'react'

type ModalContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalId: string;
  setModalId: React.Dispatch<React.SetStateAction<string>>;
}

const ModalContext = createContext({} as ModalContextType)

export const useModalContext = () => {
  return useContext(ModalContext)
}

export const ModalContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalId, setModalId] = useState("");

  const value = useMemo(() => {
    return {
      isOpen, setIsOpen, modalId, setModalId
    }
  }, [isOpen, setIsOpen, modalId, setModalId])

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}