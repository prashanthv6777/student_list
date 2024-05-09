import { combineReducers } from 'redux'

import notesReducer from './notesReducer'
export * from './notesReducer'

const allReducers = combineReducers({
  notesReducer
})

const rootReducer = (state, action) => allReducers(state, action)
export default rootReducer;
