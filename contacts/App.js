import React from 'react'
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import store from './src/reducer/index'

import Main from './src/UI/main'
import Information from './src/UI/information'

const Navigator = createStackNavigator({

  Main: {
    screen: Main,
    navigationOptions: {
      header: null
    }
  },
  Information: {
    screen: Information,
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