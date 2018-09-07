const INITIAL_STATE = {
    email: '',
    password: '',
    status: 0
}

const TYPES = {
    UPDATE_EMAIL: 'updateEmail',
    UPDATE_PASSWORD: 'updatePassword',
    CHANGE_STATUS: 'changeStatus'
}

const auth = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case TYPES.UPDATE_EMAIL:
            return { ...state, email: action.payload.email }
        case TYPES.UPDATE_PASSWORD:
            return { ...state, password: action.payload.password }
        case TYPES.CHANGE_STATUS:
            return { ...state, status: action.payload.status }
        default:
            return state
    }
}

export default auth
