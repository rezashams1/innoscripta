import { type AlertColor } from '@mui/material'
import { createContext, useContext } from 'react'

export interface GlobalContextType {
  makeAlert: (type: AlertColor, message: string) => void
}

const defaultState = {
  makeAlert: () => {},
}

export const GlobalContext = createContext<GlobalContextType>(defaultState)
export const useGlobalContext = () => useContext(GlobalContext)