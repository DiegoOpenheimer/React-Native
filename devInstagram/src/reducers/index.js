import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import REDUCERS from './combineReducers'

const store = createStore(REDUCERS, applyMiddleware(thunk))

export default store