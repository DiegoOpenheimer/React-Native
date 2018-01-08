import React, {Component} from 'react'
import {Text, ImageBackground, StyleSheet} from 'react-native'
import {NavigationActions} from 'react-navigation'
import firebase from '../FirebaseConfig'

console.ignoredYellowBox = ['Warning: ReactNative.createElement']
export default class Preload extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {}
        this.goPage = this.goPage.bind(this)
        this.verifyUser.bind(this)(firebase.auth().currentUser)

    }

    verifyUser(user) {
        user ? this.goPage('Interno') : this.goPage('Home')
    }

    goPage(page: string) {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: page})
            ]
        }))
    }

    render() {
        return (
            <ImageBackground style={styles.container} source={require("../assets/imagem/fundo.jpg")}>
                <Text style={styles.title}>Fluxo de caixa v1.0</Text>
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
    title: {
        color: '#000',
        fontSize: 36
    }
})