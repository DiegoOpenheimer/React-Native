import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation'

import Interna from './Interna'
import Pokemon from './Pokemons'
import Item from './Item'

const TabNavegador = TabNavigator({
    Interna: {
        screen: Interna
    },
    Pokemon: {
        screen: Pokemon
    },
    Item: {
        screen: Item
    }
}, {
    tabBarPosition:'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        style: {
            backgroundColor: '#4000ff'
        },
        indicatorStyle: {
            backgroundColor: '#FFF'
        }
    }
})

export default TabNavegador