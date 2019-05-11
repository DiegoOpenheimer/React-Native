import { EDIT_TODO } from './typeTodo'

export const editTodo = item => {
    return {
        type: EDIT_TODO,
        payload: item
    }
}