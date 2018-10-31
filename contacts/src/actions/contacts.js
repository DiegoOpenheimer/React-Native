import { Types } from '../reducer/reducers/contacts'
import { AsyncStorage } from 'react-native'

export const updateList = (contacts) => dispatch => {
    saveStorage(contacts)
    dispatch({
        type: Types.UPDATE_LIST,
        payload: { contacts }
    })
}

export const saveStorage = (contacts) => {
    AsyncStorage.setItem('contacts', JSON.stringify(contacts))
}

export const getContacts = () => dispatch => {
    AsyncStorage.getItem('contacts')
    .then(contacts => {
        if (contacts) {
            dispatch({
                type: Types.UPDATE_LIST,
                payload: { contacts: JSON.parse(contacts) }
            })
        }
    })
}