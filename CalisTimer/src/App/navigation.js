import { createAppContainer, createStackNavigator } from 'react-navigation'

import Main from '../views/Main/main'
import Emon from '../views/Emon/emon'

const App = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            header: null
        }
    },
    Emon: {
        screen: Emon
    }
}, { initialRouteName:'Emon' })

export default createAppContainer(App)