import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ToastAndroid
} from 'react-native'
import {NavigationActions} from 'react-navigation'
import firebase from '../FirebaseConfig'
import Interno from "./Interno";


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
        this.goToPageInterna = this.goToPageInterna.bind(this)

        firebase.auth().signOut()
    }

    goToPageInterna(user) {
        firebase.database().ref('users').child(user.uid).set({
            email: this.state.email,
            saldo: 0
        })

        firebase.auth().signInWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then(() => {
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Interno'})
                ]
            }))
        })
    }


    clearCampos() {
        this.inputEmail.clear()
        this.inputPassword.clear()
        this.inputEmail.focus()
    }

    cadastrarUser() {
        this.setState({loading: true})
        if (this.state.email !== '' && this.state.password !== '') {
            firebase.auth().createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            ).then(user => {
                this.goToPageInterna(user)
                this.clearCampos()
                this.setState({loading: false})
                ToastAndroid.show('Usuário cadastrado com sucesso', ToastAndroid.SHORT)
            }).catch(e => {
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
                    <TextInput ref={ref => this.inputEmail = ref} onChangeText={text => this.setState({email: text})}
                               maxLength={30}
                               keyboardType="email-address" placeholder="Email"/>
                    <Text style={{marginTop: 50, color: '#000000'}}>Senha:</Text>
                    <TextInput ref={ref => this.inputPassword = ref}
                               onChangeText={text => this.setState({password: text})} maxLength={15}
                               secureTextEntry={true} placeholder="Senha"/>
                </View>

                <View style={{flex: 1, alignItems: 'center'}}>
                    <TouchableOpacity onPress={this.cadastrarUser}
                                      style={{
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          backgroundColor: "blue",
                                          width: 150,
                                          height: 50,
                                          borderRadius: 5,
                                          marginTop: 50
                                      }}>
                        {this.state.loading &&
                        <ActivityIndicator style={{marginRight: 8}} animating={this.state.loading} size="small"
                                           color="white"/>}
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
        padding: 10,
        marginTop: 80
    }

})

