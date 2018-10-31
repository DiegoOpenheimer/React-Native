const initialState = {
    allContacts: []
}

export const Types = {
    UPDATE_LIST: 'UPDATE_LIST'
}

const contacts = (state = initialState, action) => {
    console.log(state, action)
    if (action.type === Types.UPDATE_LIST) {
        return { ...state,  allContacts: action.payload.contacts}
    }

    return state
}

export default contacts