import { configureStore } from '@reduxjs/toolkit'
import expressionReducer from './reducer/reducer'

export const store = configureStore({
  reducer: {
    expression : expressionReducer},
})