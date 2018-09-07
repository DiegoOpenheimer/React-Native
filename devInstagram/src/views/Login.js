import React from 'react'
import { View, Text, StyleSheet, ImageBackground, StatusBar, TextInput, TouchableNativeFeedback } from 'react-native'

import imageBackground from '../assets/bg.jpg'

const configInputEmail = {
    underlineColorAndroid: 'transparent',
    keyboardType: 'email-address',
    selectionColor: '#FFF',
    placeholderTextColor: '#FFF',
    maxLength: 30,
    placeholder: 'Informe seu email'
}

const configInputPassword = {
    underlineColorAndroid: 'transparent',
    selectionColor: '#FFF',
    placeholderTextColor: '#FFF',
    secureTextEntry: true,
    maxLength: 15,
    placeholder: 'Informe sua senha'
}

export default class Login extends React.Component {

    goRegisterAccount = () => {
        this.props.navigation.navigate('NewAccount')
    }

    render() {
        return(
            <ImageBackground source={imageBackground} style={style.container}>
            <StatusBar animated={true} translucent={true} backgroundColor="rgba(0,0,0,.3)" />
                <Text style={style.title}>DevInstagram</Text>
                <TextInput { ...configInputEmail } style={style.input}/>
                <TextInput { ...configInputPassword } style={style.input} />
                <TouchableNativeFeedback>
                    <View style={style.signButton}>
                        <Text style={style.textBtn}>Fazer login</Text>
                    </View>
                </TouchableNativeFeedback>
                <Text style={style.textRegisterAccount}>Ainda não tem cadastro? <Text onPress={this.goRegisterAccount} style={style.addUnderline}>Clique Aqui</Text></Text>
            </ImageBackground>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF'
    },
    input: {
        width: '90%',
        marginTop: 20,
        color: '#FFF',
        backgroundColor: 'rgba(0,0,0,.3)',
        borderRadius: 10,
        padding: 10
    },
    signButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFF',
        width: '90%',
        marginTop: 20,
        padding: 10,
    },
    textBtn: {
        color: '#FFF',
    },
    addUnderline: {
        textDecorationLine: 'underline'
    },
    textRegisterAccount: {
        color: '#FFF',
        marginTop: 50
    }
})
