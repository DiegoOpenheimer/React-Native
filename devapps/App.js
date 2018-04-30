import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import REDUCERS from './src/Reducers'

const store = createStore(REDUCERS, applyMiddleware(ReduxThunk))

import Preload from './src/pages/preload'
import Home from './src/pages/home'
import Login from './src/pages/login'
import Cadastrar from './src/pages/cadastro'
import ConversasList from './src/pages/home/conversasList'
import ConversaInterna from './src/pages/conversaInterna'

console.disableYellowBox = true
const Navigator = StackNavigator({
    Preload: {
        screen:Preload
    },
    Home: {
        screen:Home
    },
    Login: {
        screen:Login
    },
    Cadastrar: {
        screen:Cadastrar
    }
}, {
    headerMode:'float'
})

export default class App extends Component {
    render() {
        return(
            <Provider store={store}>
                <Navigator />
            </Provider>
        )
    }
}
