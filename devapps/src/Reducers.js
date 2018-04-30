import { combineReducers } from 'redux'
import { auth } from './reducers/authReducer'
import { chatReducer } from './reducers/chatReducer'

const REDUCERS = combineReducers({
    auth,
    chatReducer
})

export default REDUCERS
