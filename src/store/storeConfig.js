import { thunk } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducer'

export const store = configureStore({
  reducer: rootReducer
})
