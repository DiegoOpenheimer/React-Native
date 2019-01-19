import { createAppContainer, createStackNavigator } from 'react-navigation'

import Main from '../views/Main/main'
import Emon from '../views/Emon/emon'
import Isometria from '../views/Isometria/Isometria'

const App = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            header: null
        }
    },
    Emon: {
        screen: Emon
    },
    Isometria: {
        screen: Isometria
    }
}, { initialRouteName:'Main' })

export default createAppContainer(App)