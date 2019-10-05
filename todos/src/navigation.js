import React from 'react'
import { createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconInfo from 'react-native-vector-icons/Entypo'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Main from './screens/main'
import CreateTodo from './screens/createTodo'
import About from './screens/about'

const StackNavigator = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            header: null
        }
    },
    CreateTodo: {
        screen: CreateTodo,
        navigationOptions: {
            header: null
        }
    }
}, {
    navigationOptions: ({ navigation }) => ({
        tabBarVisible: navigation.state.index < 1,
    })
})

const BottomNavigator = createBottomTabNavigator({
    Stack: {
        screen: StackNavigator,
        navigationOptions: {
            title: 'Tasks',
            tabBarIcon: ({ tintColor }) => <Icon name="tasks" color={tintColor} size={20} />
        }
    },
    About: {
        screen: About,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <IconInfo name="info" color={tintColor} size={20} />
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: '#6b52ae'
    }
})

export default createAppContainer( BottomNavigator )