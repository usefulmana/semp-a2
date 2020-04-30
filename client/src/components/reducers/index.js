import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import uiReducer from './uiReducer'
import locationReducer from './locationReducer'
import typeReducer from './typeReducer'
import tourReducer from './tourReducer'
import adminReducer from './adminReducer'

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  ui: uiReducer,
  loc: locationReducer,
  type: typeReducer,
  tour: tourReducer,
  admin: adminReducer
})
