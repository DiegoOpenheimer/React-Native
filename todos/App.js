import React from 'react'
import { Provider } from 'react-redux'
import store from './src/reducers/index'
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/navigation'
import { StatusBar } from 'react-native'

const App = () => {

  return (
      <Provider store={ store }>
        <PaperProvider>
          <StatusBar  translucent={ true } backgroundColor="rgba(0,0,0,.3)" />
          <Routes />
        </PaperProvider>
      </Provider>
  )
}

export default App
