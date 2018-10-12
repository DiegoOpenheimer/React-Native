import { TYPES } from '../reducers/auth/authReducer'
import { AsyncStorage } from 'react-native'

export function updateStatus(status) {
    return {
        type: TYPES.CHANGE_STATUS,
        payload: { status }
    }
}

export function updateJwt(jwt) {
    return {
        type: TYPES.UPDATE_JWT,
        payload: { jwt }
    }
}

export function loginSuccess(status, jwt) {
    return function(dispatch){
        dispatch(updateStatus(status))
        dispatch(updateJwt(jwt))
    }
}

export function checkLogin(callback) {
    return function(dispatch) {
        AsyncStorage.getItem('jwt')
        .then(jwt => {
            if (jwt) {
                dispatch(updateJwt(jwt))
                dispatch(updateStatus(1))
                if (callback) {
                    callback('Tabs')
                }
            } else {
                dispatch(updateStatus(0))
                if (callback) {
                    callback('Login')
                }
            }
        })
        .catch(error => {
            dispatch(updateStatus(0))
        })
    }
}

export function logout() {
    return function(dispatch) {
        AsyncStorage.removeItem('jwt')
        .then(() => dispatch(updateStatus(0)))
    }
}
