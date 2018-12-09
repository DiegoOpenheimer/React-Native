import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import handlerTrips from './Trips/trips'
const REDUCER = combineReducers({ handlerTrips })

const store = createStore(REDUCER, applyMiddleware(thunk))

export default store