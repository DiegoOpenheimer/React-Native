import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'

/**
 * @param Home screen home
 * @param ListFilms screen of films
 */
import Home from './src/Home'
import ListFilms from './src/ListFilms'

const Navegador = StackNavigator({
  Home: {
    screen:Home
  },
  ListFilms: {
    screen:ListFilms
  }
})

export default Navegador

