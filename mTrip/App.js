import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './src/reducer/main'

import Navigator from './src/navigation/index'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}
