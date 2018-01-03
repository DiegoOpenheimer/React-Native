import firebase from 'firebase'

let config = {
    apiKey: "AIzaSyC3YZKOmX-Oyax-CHW4h_yxUtHS0U4CsTY",
    authDomain: "fluxo-caixa-8b897.firebaseapp.com",
    databaseURL: "https://fluxo-caixa-8b897.firebaseio.com",
    projectId: "fluxo-caixa-8b897",
    storageBucket: "fluxo-caixa-8b897.appspot.com",
    messagingSenderId: "788624302317"
}

firebase.initializeApp(config)

export default firebase