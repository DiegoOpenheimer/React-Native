import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation'


// import pages
console.disableYellowBox = true
import Home from './src/Home'
import TabNavegador from './src/TabNavegador'
import Preload from './src/Preload'

const Navegador = StackNavigator({
    Preload: {
        screen: Preload
    },
    Home: {
        screen: Home
    },
    Tab: {
        screen: TabNavegador
    }

})

export default Navegador
