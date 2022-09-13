import React, {createContext, useContext, useMemo, useState} from 'react'

type ModalContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext({} as ModalContextType)

export const useModalContext = () => {
  return useContext(ModalContext)
}

export const ModalContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(() => {
    return {
      isOpen, setIsOpen
    }
  }, [isOpen, setIsOpen])

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}