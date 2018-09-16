import React from 'react'
import { StatusBar } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import Feed from './feed'
import Profile from './Profile'


const Home = createStackNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            title: 'Feed',
            headerStyle: {
                backgroundColor: '#4da2d8',
                height: 56 + StatusBar.currentHeight,
                paddingTop: StatusBar.currentHeight
            },
            headerTitleStyle: {
                color: '#FFF',
                flex:1,
                textAlign: 'center',
            }
        }
    },
    Profile: {
        screen: Profile
    }
})


export default Home