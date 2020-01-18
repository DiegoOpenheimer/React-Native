import React from 'react'
import { StatusBar } from 'react-native' 
import Navigator from './src/Navigation'
import Color from './src/shared/Color'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from './src/context'

const store = createStore(reducer)

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor={Color.transparent} barStyle="dark-content" />
      <Navigator></Navigator>
    </Provider>
  )

}

export default App