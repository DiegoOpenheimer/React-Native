import { AsyncStorage } from 'react-native'

import { Types } from '../reducer/Trips/trips'

export const addTrips = (trips, newTrip) => {
    trips.push(newTrip)
    AsyncStorage.setItem('trips', JSON.stringify(trips))
    return updateTrips(trips)
}

export const loadTrips = () => async dispatch => {
    const trips = await AsyncStorage.getItem('trips')
    if (trips) {
        dispatch(updateTrips(JSON.parse(trips)))
    }
}

export const deleteTrip = (trips, trip) => {
    const index = trips.map(t=>t.id).indexOf(trip.id)
    if (index !== -1) {
        trips.splice(index, 1)
        AsyncStorage.setItem('trips', JSON.stringify(trips))
    }
    return updateTrips(trips)
}

export const newPoint = (trips, idTrip, point) => {
    const trip = trips.find(t => t.id === idTrip)
    if(trip) {
        trip.price += parseFloat(point.price)
        trip.places.push(point)
    }
    AsyncStorage.setItem('trips', JSON.stringify(trips))
    return updateTrips(trips)
}

export const editTrip = (trips, trip) => {
    const index = trips.indexOf(t => t.id)
    if(index !== -1) {
        trips[index] = trip
        AsyncStorage.setItem('trips', JSON.stringify(trips))
    }
    return updateTrips(trips)
}  

const updateTrips = (trips) => ({
    type: Types.UPDATE_TRIPS,
    payload: { trips }
})