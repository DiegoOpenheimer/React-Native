import AsyncStorage from '@react-native-community/async-storage'

export async function saveItem(item) {

    try {
        const todos = JSON.parse(await AsyncStorage.getItem('@todos'))
        if ( todos ) {
            const index = todos.map(todo => todo.id).indexOf(item.id)
            if ( index !== -1 ) {
                todos[ index ] = item
                AsyncStorage.setItem('@todos', JSON.stringify( todos ))
            } else {
                todos.push( item )
                AsyncStorage.setItem('@todos', JSON.stringify( todos ))   
            }
        } else {
            todos = new Array( item )
            AsyncStorage.setItem('@todos', todos)
        }
    } catch (error) {
        return null
    }
}

export function getTodos() {
    return AsyncStorage.getItem('@todos').then(todos => {
        if ( todos ) {
            return JSON.parse(todos)
        }
    })
}

export async function removeTodoInStorage(item) {
    try {
        const todos = await getTodos()
        if (todos) {
            AsyncStorage.setItem('@todos', JSON.stringify(todos.filter(todo => todo.id!==item.id)))
        }
    } catch (error) {
        
    }
}
