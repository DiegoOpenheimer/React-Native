import { EDIT_TODO, REMOVE_TODO, ADD_TODO, LOAD_TODO, UPDATE_FILTER } from './typeTodo'
import { saveItem, removeTodoInStorage, getTodos } from '../database/index'

export const editTodo = item => {
    saveItem( item )
    return {
        type: EDIT_TODO,
        payload: item
    }
}

export const loadTodos = _ => dispatch => {
    getTodos()
    .then(todos => {
        if (todos) {
            dispatch({
                type: LOAD_TODO,
                payload: todos
            })
        }
    })
}

export const addTodo = item => {
    saveItem( item )
    return {
        type: ADD_TODO,
        payload: item
    }
}

export const updateFilter = value => ({ type: UPDATE_FILTER, payload: value })

export const removeTodo = item => {
    removeTodoInStorage( item )
    return {
        type: REMOVE_TODO,
        payload: item
    }
}