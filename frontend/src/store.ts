import { type PreloadedState, combineReducers, configureStore, type Store } from '@reduxjs/toolkit'
import userSlice from './redux/slices/user'

const rootReducer = combineReducers({
  user: userSlice,
})

export const store = (preloadedState?: PreloadedState<RootState>): Store => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
export type AppStore = ReturnType<typeof store>
