import { createStackNavigator, createAppContainer } from 'react-navigation'

import Main from '../Views/main/main'
import Trips from '../Views/TripsView/TripsView'
import Trip from '../Views/TripView/TripView'
import NewTrip from '../Views/NewTrip/NewTrip'
import NewPoint from '../Views/NewPoint/newPoint'

const Navigator = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            header: null
        }
    },
    Trips: {
        screen: Trips,
        navigationOptions: {
            header: null
        }
    },
    Trip: {
        screen: Trip,
        navigationOptions: {
            header: null
        }
    },
    NewTrip: {
        screen: NewTrip
    },
    NewPoint: {
        screen: NewPoint,
        navigationOptions: {
            header: null
        }
    }
})

export default createAppContainer(Navigator)