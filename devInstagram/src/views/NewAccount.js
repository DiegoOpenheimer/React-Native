import React from 'react'
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableNativeFeedback, Alert, StatusBar, ToastAndroid, AsyncStorage } from 'react-native'
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'

import { createAccount } from '../service/auth'

import { loginSuccess } from '../actions/auth'

import imageBackground from '../assets/bg.jpg'
const configInputEmail = {
    underlineColorAndroid: 'transparent',
    keyboardType: 'email-address',
    selectionColor: '#FFF',
    placeholderTextColor: '#FFF',
    maxLength: 30,
    placeholder: 'Informe seu email'
}

const configInputName = {
    underlineColorAndroid: 'transparent',
    selectionColor: '#FFF',
    placeholderTextColor: '#FFF',
    maxLength: 30,
    placeholder: 'Informe seu nome'
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

class NewAccount extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showSpinner: false
        }
    }

    componentDidMount() {
        AndroidKeyboardAdjust.setAdjustPan()
    }

    componentWillUnmount() {
        AndroidKeyboardAdjust.setAdjustResize()
    }

    goLogin = () => {
        this.props.navigation.navigate('Login')
    }

    validateInputs = () => {
        const { email, password, passwordConfirm, name } = this.refs
        if (!(email._lastNativeText && password._lastNativeText && passwordConfirm._lastNativeText && name._lastNativeText)) {
            Alert.alert('Atenção', 'Preencha todos os campos')
        } else if (password._lastNativeText !== passwordConfirm._lastNativeText) {
            Alert.alert('Atenção', 'As senhas são diferentes')
        } else {
            this.setState({showSpinner: true})
            createAccount({ name: name._lastNativeText, email: email._lastNativeText, pass: password._lastNativeText })
            .then(response => {
                this.setState({showSpinner: false})
                if (response.data && response.data.error) {
                    Alert.alert('Atenção', 'Error ao criar conta.')
                } else {
                    this.props.loginSuccess(1, response.data.jwt.toString())
                    ToastAndroid.show('Conta criada com sucesso', ToastAndroid.SHORT)
                    AsyncStorage.setItem('jwt', response.data.jwt.toString())
                    this.goHome()
                }
            })
            .catch(error => {
                this.setState({showSpinner: false})
                Alert.alert('Atenção', 'Falha com o servidor')
            })
        }
        this.claerInputs(email, password, passwordConfirm, name)
    }
    
    claerInputs = (...inputs) => {
        inputs.forEach(input => {
            input.clear()
            input._lastNativeText = ''
        })
    }

    goHome = () => {
        const stackActions = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName:'Home'})]
        })
        this.props.navigation.dispatch(stackActions)
    }
    
    render() {
        return (
            <ImageBackground style={styles.container} source={imageBackground}>
            <Spinner cancelable={true} size="large" visible={this.state.showSpinner} textContent="Aguarde..." textStyle={{color: '#FFF'}} />
            <StatusBar animated={true} translucent={true} backgroundColor="rgba(0,0,0,.3)" />
               <Text style={styles.title}>DevInstagram</Text>
                <TextInput ref="name" { ...configInputName } style={styles.input}/>
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

export default connect(() => ({}), { loginSuccess })(NewAccount)