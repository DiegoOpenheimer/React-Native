import { ADD_TODO, LOAD_TODO, EDIT_TODO, REMOVE_TODO } from '../../actions/typeTodo'

const INITIAL_STATE = [
    {
        id: new Date().getTime(),
        task: 'estudar',
        completed: false
    },
]


const handlerTodos = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_TODO:
            return [ ...state, action.payload.todo ]
        case LOAD_TODO:
            return [ ...state, ...action.payload.todos ]
        case EDIT_TODO:
            const mState = [ ...state ]
            console.log(action)
            const index = mState.map(todo => todo.id).indexOf(action.payload.id)
            if (index !== -1) {
                mState[index] = action.payload
            }
            return [ ...mState ]
        case REMOVE_TODO:
            return [ ...state.filter(todo => todo.id !== action.payload.id) ]
        default:
            return [ ...state ]
    }
}


export default handlerTodos
