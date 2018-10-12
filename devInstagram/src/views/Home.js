import React from 'react'
import { StatusBar, TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import Feed from './feed'
import Profile from './Profile'

const Home = createStackNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            header: null,
        }
    },
    Profile: {
        screen: Profile
    }
})


export default Home