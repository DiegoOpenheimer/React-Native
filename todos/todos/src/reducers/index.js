import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import todos from './todos/todo'

const REDUCERS = combineReducers({ todos })

const store = createStore( REDUCERS, applyMiddleware( thunk ) )

export default store