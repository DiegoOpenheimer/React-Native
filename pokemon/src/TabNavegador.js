import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation'

import Pokemon from './Pokemons'
import Item from './Item'

const TabNavegador = TabNavigator({
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