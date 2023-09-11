import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../interfaces/user'

const initialState: User = {
  id: 0,
  name: '',
  email: '',
  sources: [],
  authors: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      return { state, ...action.payload }
    },
    logout: (state) => {
      return { state, ...initialState }
    }
  }
})

export const { set, logout } = userSlice.actions

export default userSlice.reducer
