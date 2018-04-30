import firebase from '../FirebaseConnection'
import { Alert } from 'react-native'
import FIREBASE_ERROR from '../../Constants/FirebaseError'

export const accountOff = () => {
    return{
        type:'accountIsOffline',
        payload: {
            status:0
        }
    }
}

export const accountOn = (uid) => {
    return {
        type:'accountIsOnline',
        payload: {
            status:1,
            uid
        }
    }
}

const activeLoading = value => {
    return value ? {type:'toogleLoading', payload:{loading: true}} : {type:'toogleLoading', payload:{loading: false}}
}

export const createAccount = (email, senha, name) => {
    return dispatch => {
        dispatch(activeLoading(true))
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then( user => {
                firebase.database().ref('users').child(user.uid).set({
                    name,
                    email,
                    date: new Date(Date.now()).toString()
                })
                dispatch(activeLoading(false))
                dispatch(changeAccountToOnline(email, name, user.uid))
            })
            .catch( err => {
                dispatch(activeLoading(false))
                switch(err.code) {
                    case FIREBASE_ERROR.EMAIL_EXISTS:
                        Alert.alert('Atenção', 'Email já está em uso')
                        break
                    case FIREBASE_ERROR.EMAIL_INVALID:
                        Alert.alert('Atenção', 'Email inválido')
                        break
                    case FIREBASE_ERROR.OPERATION_NOT_ALLOWED:
                        Alert.alert('Atenção', 'Operação não permitida')
                        break
                    case FIREBASE_ERROR.WEAK_PASSWORD:
                        Alert.alert('Atenção', 'Senha muito fraca')
                        break
                    default:
                        Alert.alert('Attention', err.message)
                }
            })
    }
}

export const doLogin = (email, senha) => {
    return dispatch => {
        dispatch(activeLoading(true))
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then( user => {
                dispatch(activeLoading(false))
                firebase.database().ref('users').child(user.uid).once('value', data => {
                    dispatch(changeAccountToOnline(data.val().email, data.val().name, user.uid))
                })
            })
            .catch( err => {
                dispatch(activeLoading(false))
                switch(err.code) {
                    case FIREBASE_ERROR.EMAIL_EXISTS:
                        Alert.alert('Atenção', 'Email já está em uso')
                        break
                    case FIREBASE_ERROR.EMAIL_INVALID:
                        Alert.alert('Atenção', 'Email inválido')
                        break
                    case FIREBASE_ERROR.OPERATION_NOT_ALLOWED:
                        Alert.alert('Atenção', 'Operação não permitida')
                        break
                    case FIREBASE_ERROR.WEAK_PASSWORD:
                        Alert.alert('Atenção', 'Senha muito fraca')
                        break
                    default:
                        Alert.alert('Attention', err.message)
                }
            })
    }
}

const changeAccountToOnline = (email = '', name = '', uid = '') => {
    return {
        type:'changeAccountToOnline',
        payload: {
            email,
            name,
            uid
        }
    }
}

export const logout = () => {
    firebase.auth().signOut()
    return{
        type:'logout',
        payload: {
            status:0
        }
    }
}

export const loadEmail = email => ({type:'loadEmail', payload:{email}})
export const loadName = name => ({type:'loadName', payload:{name}})
