import React from 'react'
import { View, Text, StyleSheet, ImageBackground, StatusBar, TextInput, TouchableNativeFeedback, Alert, ToastAndroid, AsyncStorage } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'

import { requestLogin } from '../service/auth'
import imageBackground from '../assets/bg.jpg'
import { loginSuccess } from '../actions/auth'

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

class Login extends React.Component {

    state = {
        user: {
            email:'',
            pass: ''
        },
        showLoading: false
    }

    goRegisterAccount = () => {
        this.props.navigation.navigate('NewAccount')
    }

    validationUser = () => {
        const user = this.state.user
        if (!(user.email && user.pass)) {
            Alert.alert('Atenção', 'Preencha email e senha')
        } else {
            this.setState({showLoading: true})
            requestLogin(user)
            .then(this.handlerSuccess('Error ao logar'))
            .catch(this.handlerError('Error ao logar'))
        }
    }

    handlerSuccess = (message) => response => {
        this.setState({showLoading: false})
        if (response.data && response.data.error) {
            ToastAndroid.show(message, ToastAndroid.SHORT)
        } else {
            const stackActions = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Tabs'})]
            })
            this.props.navigation.dispatch(stackActions)
            AsyncStorage.setItem('jwt', response.data.jwt)
            this.props.loginSuccess(1, response.data.jwt)
        }
    }

    handlerError = message => response => {
        this.setState({showLoading: false})
        ToastAndroid.show(message, ToastAndroid.SHORT)
    }

    handlerState = field => text => {
        const user = this.state.user
        user[field] = text
        this.setState({user})
    }

    render() {
        return(
            <ImageBackground source={imageBackground} style={style.container}>
            <Spinner visible={this.state.showLoading} size="large" />
            <StatusBar animated={true} translucent={true} backgroundColor="rgba(0,0,0,.3)" />
                <Text style={style.title}>DevInstagram</Text>
                <TextInput value={this.state.email} onChangeText={this.handlerState('email')} { ...configInputEmail } style={style.input}/>
                <TextInput value={this.state.pass} onChangeText={this.handlerState('pass')} { ...configInputPassword } style={style.input} />
                <TouchableNativeFeedback onPress={this.validationUser}>
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

export default connect(() => ({}), { loginSuccess })(Login)
