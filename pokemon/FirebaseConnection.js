import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBhODmoPulSy5uXyxQ8FsD2w4G0iEk8Jl4",
    authDomain: "pokemon-d9584.firebaseapp.com",
    databaseURL: "https://pokemon-d9584.firebaseio.com",
    projectId: "pokemon-d9584",
    storageBucket: "pokemon-d9584.appspot.com",
    messagingSenderId: "625883679352"
}
firebase.initializeApp(config)

export default firebase