import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation'

/**
 * Screens
 */
import Home from './src/Home'
import Cadastrar from './src/Cadastrar'

const Navegador = StackNavigator({
    Home: {
        screen: Home
    },
    Cadastrar: {
        screen: Cadastrar
    }
})

export default Navegador
