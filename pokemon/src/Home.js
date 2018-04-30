import React, {Component} from 'react'
import {
    Text,
    ImageBackground,
    TextInput,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    DatePickerAndroid,
    ScrollView,
    Alert,
    ToastAndroid,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native'
import {Icon} from 'react-native-elements'
import {NavigationActions} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import { View } from 'react-native-animatable'
import firebase from '../FirebaseConnection'
import FIREBASE_CODE_ERRORS from '../FirebaseUtil'


export default class Home extends Component {


    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            cadastro: false
        }

    }

    render() {
        return (
            <ImageBackground source={require('../assets/img/PlanoFundo.jpg')} style={styles.container}>
                <StatusBar backgroundColor="#4000FF"/>
                <View useNativeDriver={true} duration={3000} delay={500} animation="zoomInDown" style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={styles.image} resizeMode="contain"
                           source={require('../assets/img/pokemonTitle.png')}/>
                </View>
                {this.state.cadastro ? <Cadastrar goLogin={() => this.setState({cadastro: false})}/> :
                    <Login navigation={this.props.navigation} goCadastro={() => this.setState({cadastro: true})}/>}
            </ImageBackground>
        )
    }
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false
        }

        this.logar = this.logar.bind(this)
    }

    logar() {
        if(this.state.email.trim() !== '' && this.state.password.trim() !== '') {
            this.setState({loading: true})
            firebase.auth().signInWithEmailAndPassword(
                this.state.email,
                this.state.password
            ).then(user => {
                this.setState({loading: false})
                this.setState({email:'', password:''})
                this.props.navigation.dispatch(NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Tab'})
                    ]
                }))
            }).catch( err => {
                switch(err.code) {
                    case FIREBASE_CODE_ERRORS.INVALID_EMAIL:
                        Alert.alert('Atenção', 'Email inválido')
                        break
                    case FIREBASE_CODE_ERRORS.OPERATION_NOT_ALLOWED:
                        Alert.alert('Atenção', 'Operação não permitida')
                        break
                    default:
                        Alert.alert('Atenção', 'Error ao realizar login')
                        break
                }
            })
        } else {
            ToastAndroid.showWithGravity('Preencha os campos', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }


    render() {
        return (
            <View style={styles.form}>
        
                <Spinner visible={this.state.loading} cancelable={true}/>
                <View style={styles.contentInput}>
                    <TextInput  value={this.state.email} onChangeText={email => this.setState({email: email})} selectionColor="#4000FF"
                               placeholderTextColor="#FFF"
                               underlineColorAndroid="transparent" style={styles.input}
                               placeholder="Informe seu email"/>
                    <TextInput value={this.state.password} onChangeText={password => this.setState({password: password})} selectionColor="#4000FF"
                               secureTextEntry={true} placeholderTextColor="#FFF"
                               underlineColorAndroid="transparent" style={styles.input}
                               placeholder="Digite sua senha"/>

                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.goCadastro}>
                            <Text style={styles.btn}>Cadastrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.logar}>
                            <Text style={styles.btn}>Logar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
          
                </View>

        )
    }
}

class Cadastrar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            nome: '',
            senha: '',
            confirmSenha: '',
            nascimento: '',
            passwordIsNotEqual: false,
            loading: false,
            bgError: 'rgba(0,0,0,.3)',
        }


        this.datePickerAndroid = this.datePickerAndroid.bind(this)
        this.cadastrar = this.cadastrar.bind(this)
        this.confirmPassword = this.confirmPassword.bind(this)
        this.blurInputs = this.blurInputs.bind(this)
    }

    blurInputs() {
        this.refs.confirmPassword.blur()
        this.refs.password.blur()
    }

    confirmPassword() {
        let state = this.state
        if (state.senha != state.confirmSenha) {
            state.passwordIsNotEqual = true
            state.bgError = 'rgba(255,0,0,.6)'
            this.setState(state)
            return false
        } else {
            state.passwordIsNotEqual = false
            state.bgError = 'rgba(0,0,0,.3)'
            this.setState(state)
            return true
        }

    }

    cadastrar() {
        this.setState({loading: true})
        this.blurInputs()
        if (this.confirmPassword()) {
            firebase.auth().createUserWithEmailAndPassword(
                this.state.email,
                this.state.senha
            ).then(user => {
                this.setState({loading: false})
                this.props.goLogin()
                ToastAndroid.show('Conta Criada com sucesso', ToastAndroid.SHORT)
                firebase.database().ref('users').child(user.uid).set({
                    name: this.state.nome,
                    email: this.state.email,
                    nascimento: this.state.nascimento,
                    createAccount: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
                })
            }).catch(err => {
                this.setState({loading: false})
                switch (err.code) {
                    case FIREBASE_CODE_ERRORS.INVALID_EMAIL:
                        Alert.alert('Atenção', 'Email inválido')
                        break
                    case FIREBASE_CODE_ERRORS.OPERATION_NOT_ALLOWED:
                        Alert.alert('Atenção', 'Operação não permitida')
                        break
                    default:
                        Alert.alert('Atenção', 'Error ao criar conta')
                }

            })
        }
    }

    async datePickerAndroid() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({nascimento: `${day}/${month + 1}/${year}`})
            }
        } catch ({code, message}) {
            Alert.alert("Erro ao abrir API datePicker")
            console.warn(message)
        }
    }


    render() {
        return (
            <View style={[styles.form, {bottom: this.state.bottom}]}>
                <View style={styles.contentInput}>

                    <Icon underlayColor="rgba(0,0,0,.1)" iconStyle={{fontSize: 45, marginLeft: 10}} color="#FFF"
                          name="chevron-left" onPress={this.props.goLogin}
                          containerStyle={{bottom: 50, alignItems: 'flex-start', borderRadius: 20, width: 100}}/>

                    <TextInput onChangeText={email => this.setState({email: email})} maxLength={50}
                               selectionColor="#4000FF" placeholderTextColor="#FFF"
                               underlineColorAndroid="transparent" style={styles.input}
                               placeholder="Informe seu email"/>
                    <TextInput ref="password" onChangeText={password => this.setState({senha: password})} maxLength={15}
                               selectionColor="#4000FF" secureTextEntry={true}
                               placeholderTextColor="#FFF"
                               underlineColorAndroid="transparent"
                               style={[styles.input, {backgroundColor: this.state.bgError}]}
                               placeholder="Digite sua senha"
                               onFocus={() => this.setState({passwordIsNotEqual: false, bgError: 'rgba(0,0,0,.3)'})}/>
                    <TextInput ref="confirmPassword" onChangeText={password => this.setState({confirmSenha: password})}
                               maxLength={15} selectionColor="#4000FF" secureTextEntry={true}
                               placeholderTextColor="#FFF"
                               underlineColorAndroid="transparent"
                               style={[styles.input, {backgroundColor: this.state.bgError}]}
                               placeholder="Informe sua senha novamente"
                               onFocus={() => this.setState({passwordIsNotEqual: false, bgError: 'rgba(0,0,0,.3)'})}/>
                    {this.state.passwordIsNotEqual && <Text style={styles.messageError}>Senhas diferente</Text>}
                    <TextInput onChangeText={name => this.setState({nome: name})} maxLength={50}
                               selectionColor="#4000FF" placeholderTextColor="#FFF"
                               underlineColorAndroid="transparent" style={styles.input}
                               placeholder="Informe seu nome"/>
                    <TouchableOpacity style={styles.inputTouchable} onPress={this.datePickerAndroid}>
                        <Text style={{color: 'white'}}>Nascimento: {this.state.nascimento}</Text>
                    </TouchableOpacity>


                    <View style={styles.buttons}>
                        <TouchableOpacity style={{flexDirection: 'row', paddingLeft: 5}} onPress={this.cadastrar}>
                            <ActivityIndicator style={{marginRight: 10}} color='#FFF' animating={this.state.loading}/>
                            <Text style={styles.btn}>Cadastrar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    image: {
        flex: 1,
        width: 350,
        bottom: 30,
    },
    form: {
        flex: 2,
        alignItems: 'stretch',
    },
    contentInput: {
        flex: 1,
        alignItems: 'stretch',
        marginLeft: 20,
        marginRight: 20
    },
    input: {
        backgroundColor: 'rgba(0,0,0,.3)',
        padding: 10,
        borderRadius: 30,
        color: '#FFF',
        margin: 5,
        bottom: 50
    },
    inputTouchable: {
        backgroundColor: 'rgba(0,0,0,.3)',
        padding: 10,
        borderRadius: 30,
        margin: 5,
        bottom: 50
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        bottom: 30
    },
    btn: {
        color: '#4000ff',
        fontSize: 26,
        textDecorationLine: 'underline',
    },
    messageError: {
        color: 'red',
        bottom: 50,
        marginLeft: 15
    }
})


