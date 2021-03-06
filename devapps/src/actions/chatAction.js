import firebase from '../FirebaseConnection'

export const getAllContacts = (uid) => {
    return dispatch => {
        firebase.database().ref('users').on('value', snapshot => {
            let users = []
            snapshot.forEach(childItem => {
                if(childItem.key !== uid) {
                    users.push({
                        key:childItem.key,
                        name:childItem.val().name
                    })
                }
            })
            dispatch(toogleLoadingController(false))
            dispatch({
                type:'getContacts',
                payload: {
                    contacts: users
                }
            })
        })
    }
}

export const createChat = (userUid1, userUid2) => {
    return dispatch => {

        firebase.database().ref('users').child(userUid1).child('chats').once('value', snapshot => {
            if(snapshot.exists()) {
                let checkExist = true
                let keyChat = ''
                snapshot.forEach(childItem=>{
                    if(childItem.val().idContact == userUid2) {
                        checkExist = false
                        keyChat = childItem.key
                    }
                })
               if(checkExist) {
                    let newChat = firebase.database().ref('chats').push()
                    newChat.child('members').child(userUid1).set({id:userUid1})
                    newChat.child('members').child(userUid2).set({id:userUid2})

                    firebase.database().ref('users').child(userUid1).once('value', snapshot=>{
                        firebase.database().ref('users').child(userUid2).child('chats').child(newChat.key).set({id:newChat.key, idContact: userUid1, name: snapshot.val().name})
                    })

                    firebase.database().ref('users').child(userUid2).once('value', snapshot=>{
                        firebase.database().ref('users').child(userUid1).child('chats').child(newChat.key).set({id:newChat.key, idContact: userUid2, name: snapshot.val().name})
                    })
                    dispatch(setActive(newChat.key))
               } else {
                    dispatch(setActive(keyChat))
               }
            } else {
                let newChat = firebase.database().ref('chats').push()
                newChat.child('members').child(userUid1).set({id:userUid1})
                newChat.child('members').child(userUid2).set({id:userUid2})

                firebase.database().ref('users').child(userUid1).once('value', snapshot=>{
                    firebase.database().ref('users').child(userUid2).child('chats').child(newChat.key).set({id:newChat.key, idContact: userUid1, name: snapshot.val().name})
                })

                firebase.database().ref('users').child(userUid2).once('value', snapshot=>{
                    firebase.database().ref('users').child(userUid1).child('chats').child(newChat.key).set({id:newChat.key, idContact: userUid2, name: snapshot.val().name})
                })
                dispatch(setActive(newChat.key))
            }
        })

    }

}

export const setActive = key => ({type:'setActiveChat', payload:{chatId:key}})

export const getTalks = userUid => {
  return dispatch => {
    firebase.database().ref('users').child(userUid).child('chats').on('value', snapshot => {
      let chats = Array()
      snapshot.forEach(childItem => {
        chats.push({
            key:childItem.key,
            name:childItem.val().name,
            idContact:childItem.val().idContact
        })
      })
      dispatch(toogleLoadingController(false))
      dispatch(setChats(chats))
    })
  }
}

export const toogleLoadingController = value => ({type:'toogleLoading', payload:{bool:value}})
const setChats = chats => ({type:'setChats', payload:{chats}})

export const sendMessage = (uid, chatKey, message, type, informationImage = undefined) => {
    let body = informationImage ? {
        id: uid,
        message: message,
        dateMessage: new Date().getFullYear() + 
                    '/' + (new Date().getMonth() + 1) + 
                    '/' + new Date().getDate() + 
                    ' ' + new Date().getHours() + 
                    ':' + new Date().getMinutes(),
        type,
        informationImage: {
            width: informationImage.width,
            height: informationImage.height
        }
    
    } : {
        id: uid,
        message: message,
        dateMessage: new Date().getFullYear() + 
                    '/' + (new Date().getMonth() + 1) + 
                    '/' + new Date().getDate() + 
                    ' ' + new Date().getHours() + 
                    ':' + new Date().getMinutes(),
        type
    }
    return dispatch => {
        let chat = firebase.database().ref('chats').child(chatKey)
        chat.child('messages').push(body)
    
    }
}


export const getMessages = chatId => {
    return dispatch => {
        firebase.database().ref('chats').child(chatId).child('messages').on('value', snapshot => {
            if(snapshot.exists()) {
                let messages = new Array()
                snapshot.forEach(childItem => {
                    let body = 'informationImage' in childItem.val() ? {
                        date: childItem.val().dateMessage,
                        id: childItem.val().id,
                        message: childItem.val().message,
                        type: childItem.val().type,
                        informationImage:childItem.val().informationImage
                    } : {
                        date:childItem.val().dateMessage,
                        id: childItem.val().id,
                        message:childItem.val().message,
                        type:childItem.val().type
                    }
                    messages.push(body)
                })
                dispatch(setMessages(messages))
            } else {
                dispatch(setMessages(new Array()))
            }
        })
    }
}

export const setMessages = msgs => ({type:'getMessages', payload:{msgs}})
