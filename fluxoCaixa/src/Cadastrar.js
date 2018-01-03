import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator, Alert, ToastAndroid} from 'react-native'
import firebase from '../FirebaseConfig'

export default class Cadastrar extends Component {

    static navigationOptions = {
        title: 'Cadastrar',
        headerStyle: {
            backgroundColor: '#FFFF00'
        },
        headerTintColor: '#000000'
    }

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false
        }
        this.cadastrarUser = this.cadastrarUser.bind(this)

        firebase.auth().signOut()
    }

    clearCampos() {
        this.inputEmail.clear()
        this.inputPassword.clear()
        this.inputEmail.focus()
    }

    cadastrarUser() {
        this.setState({loading: true})
        if(this.state.email !== '' && this.state.password !== '') {
            firebase.auth().createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            ).then( user => {
                this.clearCampos()
                this.setState({loading: false})
                ToastAndroid.show('Usuário cadastrado com sucesso', ToastAndroid.SHORT)
            }).catch( e => {
                Alert.alert(e.code)
                this.setState({loading: false})
                this.clearCampos()
            })

        } else {
            this.setState({loading: false})
            Alert.alert('Preencha os campos')
        }
    }

    render() {
        return (
            <ImageBackground source={require('../assets/imagem/fundo.jpg')} style={styles.container}>
                <View style={styles.form}>
                    <Text style={{color: '#000000'}}>Email:</Text>
                    <TextInput ref={ ref => this.inputEmail = ref } onChangeText={text => this.setState({email: text})} maxLength={30}
                               keyboardType="email-address" placeholder="Email"/>
                    <Text style={{marginTop: 50, color: '#000000'}}>Senha:</Text>
                    <TextInput ref={ ref => this.inputPassword = ref } onChangeText={text => this.setState({password: text})} maxLength={15}
                               secureTextEntry={true} placeholder="Senha"/>
                </View>

                <View style={{flex: 1, alignItems: 'center'}}>
                    <TouchableOpacity onPress={this.cadastrarUser}
                                      style={{flexDirection:'row',justifyContent:'center',backgroundColor: "blue", width: 150, borderRadius: 5}}>
                        {this.state.loading && <ActivityIndicator style={{marginRight:8}} animating={this.state.loading} size="small" color="white" />}
                        <Text style={{color: "white", fontSize: 20, textAlign: 'center'}}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    form: {
        flex: 1,
        justifyContent: "center",
        padding: 10
    }

})

