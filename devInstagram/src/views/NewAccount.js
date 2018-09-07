import React from 'react'
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableNativeFeedback, Alert, StatusBar } from 'react-native'

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

const configInputPasswordConfirm = {
    underlineColorAndroid: 'transparent',
    selectionColor: '#FFF',
    placeholderTextColor: '#FFF',
    secureTextEntry: true,
    maxLength: 15,
    placeholder: 'Confirme sua senha'
}

export default class NewAccount extends React.Component {

    goLogin = () => {
        this.props.navigation.navigate('Login')
    }

    validateInputs = () => {
        const { email, password, passwordConfirm } = this.refs
        if (!(email._lastNativeText && password._lastNativeText && passwordConfirm._lastNativeText)) {
            Alert.alert('Atenção', 'Preencha todos os campos')
        } else if (password._lastNativeText !== passwordConfirm._lastNativeText) {
            Alert.alert('Atenção', 'As senhas são diferentes')
        }
        email.clear()
        password.clear()
        passwordConfirm.clear()
        email.focus()
    }    

    render() {
        return (
            <ImageBackground style={styles.container} source={imageBackground}>
            <StatusBar animated={true} translucent={true} backgroundColor="rgba(0,0,0,.3)" />
               <Text style={styles.title}>DevInstagram</Text>
                <TextInput ref="email" { ...configInputEmail } style={styles.input}/>
                <TextInput ref="password" { ...configInputPassword } style={styles.input} />
                <TextInput ref="passwordConfirm" { ...configInputPasswordConfirm } style={styles.input} />
                <TouchableNativeFeedback onPress={this.validateInputs}>
                    <View style={styles.signButton}>
                        <Text style={styles.textBtn}>Fazer cadastro</Text>
                    </View>
                </TouchableNativeFeedback>
                <Text style={styles.textRegisterAccount}>Já é cadastrado? <Text onPress={this.goLogin} style={styles.addUnderline}>Clique Aqui</Text></Text>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
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