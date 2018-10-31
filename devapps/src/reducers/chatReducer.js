const initialState = {
    contacts:[],
    chats:[],
    activeChat: '',
    messages:[],
    loadingController: false
}

export const chatReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'getContacts':
            return {...state, contacts:action.payload.contacts}
            break
        case 'setActiveChat':
            return { ...state, activeChat:action.payload.chatId }
            break
        case 'setChats':
            return { ...state, chats:action.payload.chats }
            break
        case 'getMessages':
            return {...state, messages:action.payload.msgs}
            break
        case 'toogleLoading':
            return {...state, loadingController:action.payload.bool}
            break
        default:
            return state
    }
}
