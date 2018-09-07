import { combineReducers } from 'redux'
import auth from './auth/authReducer'

const reducers = combineReducers({
    auth
})

export default reducers