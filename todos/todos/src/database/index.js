import AsyncStorage from '@react-native-community/async-storage'

const KEY = '@todos'

export async function saveItem(item) {
    try {
        let todos = JSON.parse(await AsyncStorage.getItem(KEY))
        if ( todos ) {
            const index = todos.map(todo => todo.id).indexOf(item.id)
            if ( index !== -1 ) {
                todos[ index ] = item
                AsyncStorage.setItem(KEY, JSON.stringify( todos ))
            } else {
                todos.push( item )
                AsyncStorage.setItem(KEY, JSON.stringify( todos ))   
            }
        } else {
            todos = new Array( item )
            AsyncStorage.setItem(KEY, JSON.stringify(todos))
        }
    } catch (error) {
        return null
    }
}

export function getTodos() {
    return AsyncStorage.getItem(KEY).then(todos => {
        if ( todos ) {
            return JSON.parse(todos)
        }
    })
}

export async function removeTodoInStorage(item) {
    try {
        const todos = await getTodos()
        if (todos) {
            AsyncStorage.setItem(KEY, JSON.stringify(todos.filter(todo => todo.id!==item.id)))
        }
    } catch (error) {
     return null   
    }
}
