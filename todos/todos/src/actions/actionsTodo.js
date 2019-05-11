import { EDIT_TODO, REMOVE_TODO, ADD_TODO } from './typeTodo'
import { saveItem, removeTodoInStorage } from '../database/index'

export const editTodo = item => {
    saveItem( item )
    return {
        type: EDIT_TODO,
        payload: item
    }
}

export const addTodo = item => {
    saveItem( item )
    return {
        type: ADD_TODO,
        payload: item
    }
}

export const removeTodo = item => {
    removeTodoInStorage( item )
    return {
        type: REMOVE_TODO,
        payload: item
    }
}