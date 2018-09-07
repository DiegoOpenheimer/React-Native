import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import Preload from './src/views/Preload'
import Login from './src/views/Login'
import Home from './src/views/Home'

import store from './src/reducers/index'


const Navigator = createStackNavigator({
  Preload: {
    screen: Preload,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: Home
  }
})

export default class App extends React.Component {
  render() {
    return(
        <Provider store={store}>
            <Navigator />
        </Provider>
    )
  }
}