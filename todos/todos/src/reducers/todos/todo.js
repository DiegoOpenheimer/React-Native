import { ADD_TODO, LOAD_TODO, EDIT_TODO, REMOVE_TODO, UPDATE_FILTER } from '../../actions/typeTodo'

const INITIAL_STATE = {
    all: [],
    todoFiltered: [],
    filter: 0
}


const handlerTodos = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_TODO:
            return addTodo(state, action)
        case LOAD_TODO:
            return loadTodo(state, action)
        case EDIT_TODO:
            return editTodo(state, action)
        case REMOVE_TODO:
            return removeTodo(state, action)
        case UPDATE_FILTER:
            return updateFilter(state, action)
        default:
            return { ...state }
    }
}

const addTodo = (state, action) => {
    const all = [ ...state.all, action.payload ]
    let todoFiltered
    if (!state.filter) {
        todoFiltered = [ ...all ]
    } else if (state.filter === 1) {
        todoFiltered = [...state.all.filter(todo => !todo.completed)]
    } else {
        todoFiltered = [...state.all.filter(todo => todo.completed)]    
    }
    return { ...state, all, todoFiltered  }
}

const loadTodo = (state, action) => {
    const todos = [...action.payload]
    return { ...state, all: todos, todoFiltered: todos, filter: 0 }
}

const editTodo = (state, action) => {
    const mState = { ...state }
    const index = mState.all.map(todo => todo.id).indexOf(action.payload.id)
    if (index !== -1) {
        mState.all[index] = action.payload
    }
    let todoFiltered
    if (!mState.filter) {
        todoFiltered = [ ...mState.all ]
    } else if (mState.filter === 1) {
        todoFiltered = [...mState.all.filter(todo => !todo.completed)]
    } else {
        todoFiltered = [...mState.all.filter(todo => todo.completed)]    
    }
    return { ...mState, todoFiltered, all: [...mState.all] }
}

const updateFilter = (state, action) => {
    const filter = action.payload
    let todoFiltered
    if (!filter) {
        todoFiltered = [ ...state.all ]
    } else if (filter === 1) {
        todoFiltered = [ ...state.all.filter(todo => !todo.completed) ]
    } else {
        todoFiltered = [ ...state.all.filter(todo => todo.completed) ]
    }
    return { ...state, todoFiltered, filter }
}

const removeTodo = (state, action) => {
    const callback = todo => todo.id !== action.payload.id
    return { ...state, all: [...state.all.filter(callback)], todoFiltered: [...state.todoFiltered.filter(callback)] }
}

export default handlerTodos
