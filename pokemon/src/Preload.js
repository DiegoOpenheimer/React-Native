import React, {Component} from 'react'
import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native'
import {NavigationActions} from 'react-navigation'
import firebase from '../FirebaseConnection'

export default class Preload extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)

        this.checkUser = this.checkUser.bind(this)

        firebase.auth().onAuthStateChanged(this.checkUser)
    }

    checkUser(user) {
            if (user) {
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Tab'})
                ]
            }))
        } else {
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Home'})
                ]
            }))
        }
    }

    render() {
        return (
            <ImageBackground source={require('../assets/img/PlanoFundo.jpg')} style={styles.container}>
                <Image style={styles.image} resizeMode="contain" source={require("../assets/img/pokemonTitle.png")}/>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 350,
    }
})
