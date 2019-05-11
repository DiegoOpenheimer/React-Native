import { createAppContainer, createStackNavigator } from 'react-navigation'

import Main from './screens/main'
import CreateTodo from './screens/createTodo'

const stackNavigator = createStackNavigator({
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
})

export default createAppContainer( stackNavigator )