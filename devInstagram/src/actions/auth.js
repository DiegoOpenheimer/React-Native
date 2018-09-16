import { TYPES } from '../reducers/auth/authReducer'

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
