const INITIAL_STATE = {
    trips: []
}

export const Types = {
    UPDATE_TRIPS: 'UPDATE_TRIPS'
}

const handlerTrips = (state = INITIAL_STATE, actions) => {
    if (actions.type === Types.UPDATE_TRIPS) {
        return { ...state,
            trips: [...actions.payload.trips]
        }
    }
    return state
}

export default handlerTrips