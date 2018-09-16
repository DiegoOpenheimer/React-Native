import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'


import Preload from './src/views/Preload'
import Login from './src/views/Login'
import Tabs from './src/views/Tabs'
import NewAccount from './src/views/NewAccount'

import store from './src/reducers/index'

import Reactotron, { networking } from 'reactotron-react-native'

if (__DEV__) {
  Reactotron
  .configure({host: '192.168.56.1'})
  .useReactNative(networking())
  .connect()
  console.tron = Reactotron  
}

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
  NewAccount: {
    screen: NewAccount,
    navigationOptions: {
      header: null
    }
  },
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
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