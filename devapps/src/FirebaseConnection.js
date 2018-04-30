import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBRgahGWRMZVcjrZJQjveUiktmtBYJH-9w",
    authDomain: "devappa-61176.firebaseapp.com",
    databaseURL: "https://devappa-61176.firebaseio.com",
    projectId: "devappa-61176",
    storageBucket: "devappa-61176.appspot.com",
    messagingSenderId: "338933264231"
}

firebase.initializeApp(config)

export default firebase