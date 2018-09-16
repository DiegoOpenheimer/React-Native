import React from 'react'
import { Image } from 'react-native'

import { createBottomTabNavigator } from 'react-navigation'

import Home from './Home'
import DevCamera from './DevCamera'
import Explore from './Explore'
import Profile from './Profile'

import camera from '../assets/camera.png'
import cameraOff from '../assets/camera_off.png'
import home from '../assets/home.png'
import homeOff from '../assets/home_off.png'
import profile from '../assets/profile.png'
import profileOff from '../assets/profile_off.png'
import search from '../assets/search.png'
import searchOff from '../assets/search_off.png'

const filterTabIcon = (logoFocus, logoNotFocus) => ({focused}) => {
    if (focused) {
        return <Image source={logoFocus} style={{width: 32, height: 32}} />
    } else {
        return <Image source={logoNotFocus} style={{width: 32, height: 32}} />
    }
}

const Tabs = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarIcon: filterTabIcon(home, homeOff)
        }
    },
    Explore: {
        screen: Explore,
        navigationOptions: {
            tabBarIcon: filterTabIcon(search, searchOff)
        }
    },
    DevCamera: {
        screen: DevCamera,
        navigationOptions: {
            tabBarIcon: filterTabIcon(camera, cameraOff)
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: filterTabIcon(profile, profileOff),
            tabBarOnPress: (props) => {
                props.navigation.navigate('Explore')
                props.navigation.navigate('Profile')
            }
        }
    },
}, {
    tabBarOptions: {
        showLabel: false,
        activeBackgroundColor: '#333',
        inactiveBackgroundColor: '#CCC'
    }
})

export default Tabs