import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Thoughts from './thoughts/index'
import Config from './config/index'
import Color from './shared/Color'

const BottomTabNavigator = createBottomTabNavigator({ Thoughts, Config }, {
    tabBarOptions: {
        activeTintColor: Color.primaryColor
    }
})

export default createAppContainer(BottomTabNavigator)