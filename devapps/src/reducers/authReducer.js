const initialState = {
    name:'',
    email:'',
    loading:false,
    status:0,
    uid:''
}

export const auth = (state = initialState, action) => {
    switch(action.type) {
        case 'toogleLoading':
            return {...state, loading:action.payload.loading}
            break
        case 'changeAccountToOnline':
            return {...state, name:action.payload.name, email:action.payload.email, status:1, uid:action.payload.uid}
            break
        case 'accountIsOffline':
            return {...state, status: action.payload.status}
            break
        case 'loadEmail':
            return {...state, email:action.payload.email}
            break
        case 'loadName':
            return{...state, name:action.payload.name}
            break
        case 'logout':
            return {...state, status:action.payload.status}
            break
        case 'accountIsOnline':
            return {...state, status:action.payload.status, uid:action.payload.uid}
            break
        default:
            return state
    }
}