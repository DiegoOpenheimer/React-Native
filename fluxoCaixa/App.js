import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation'

/**
 * Screens
 */
console.disableYellowBox = true
import Home from './src/Home'
import Cadastrar from './src/Cadastrar'
import Interno from './src/Interno'
import Preload from './src/preload'
import Receita from './src/receita'
import Despesa from './src/despesa'

const Navegador = StackNavigator({
    Preload: {
        screen: Preload
    },
    Home: {
        screen: Home
    },
    Cadastrar: {
        screen: Cadastrar
    },
    Interno: {
        screen: Interno
    },
    Receita: {
        screen:Receita
    },
    Despesa: {
        screen: Despesa
    }
})

export default Navegador
