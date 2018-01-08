import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Button,
    Alert,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import Modal from 'react-native-modal'
import {NavigationActions} from 'react-navigation'
import firebase from '../FirebaseConfig'
import Spinner from 'react-native-loading-spinner-overlay'


export default class Home extends Component {

    static navigationOptions = {
        header: null
    }


    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            email: '',
            password: '',
            loading: false

        }
        this.initializeMethods.bind(this)()

        firebase.auth().onAuthStateChanged(this.isLogado)

    }

    isLogado(user) {
        if (user) {
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Interno'})
                ]
            }))
        }
    }

    logarIn() {
        if (this.state.email.trim() === '' || this.state.password.trim() === '') {
            Alert.alert('preencha os campos')
        } else {
            this.setState({loading:true, showModal: false})
            firebase.auth().signInWithEmailAndPassword(
                this.state.email,
                this.state.password
            ).then(user => {
                this.setState({loading:false})
                this.props.navigation.dispatch(NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Interno'})
                    ]
                }))
            }).catch(err => {
                this.setState({loading:false})
                Alert.alert(err.code)
            })
        }
    }

    cadastrar() {
        this.props.navigation.navigate('Cadastrar')
    }

    logar() {
        this.setState({
            showModal: true
        })
    }

    render() {
        return (
            <ImageBackground source={require('../assets/imagem/fundo.jpg')} style={styles.imgBackground}>
                <Spinner  animation="fade" visible={this.state.loading} overlayColor="rgba(0,0,0,0.5)">
                    <View style={{justifyContent:'center', flex:1, alignItems:'center'}}>
                        <View style={{height: 150, width: 200, justifyContent:'center', alignItems:'center', backgroundColor:'white', borderRadius:8}}>
                           <ActivityIndicator size="large"/>
                            <Text style={{fontSize:20, top:2}}>Carregando...</Text>
                        </View>
                    </View>
                   </Spinner>
                <Text style={styles.title}>Fluxo de caixa v1.0</Text>
                <TouchableOpacity style={styles.btn} onPress={this.cadastrar}>
                    <View>
                        <Text style={{color: '#FFFFFF', fontSize: 20}}>Cadastrar</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={this.logar}>
                    <View>
                        <Text style={{color: '#FFFFFF', fontSize: 20}}>Login</Text>
                    </View>
                </TouchableOpacity>

                <Modal style={{alignItems: 'center', justifyContent: 'center'}}
                       isVisible={this.state.showModal}
                       animationOut="fadeOut"
                       onBackdropPress={() => this.setState({showModal: false})}
                       onBackButtonPress={() => this.setState({showModal: false})}>


                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: 'white',
                            width: 300,
                            minHeight: 360,
                            padding: 10,
                            borderRadius: 8
                        }}>

                            <Text style={styles.titleModal}>Login</Text>

                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
                                <Text>Email: </Text>
                                <TextInput style={{marginBottom: 50}} onChangeText={t => this.setState({email: t})}
                                           placeholder="Email"/>
                                <Text>Senha: </Text>
                                <TextInput onChangeText={p => this.setState({password: p})} secureTextEntry={true}
                                           placeholder="Senha"/>

                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <View style={{width: 100}}>
                                    <Button title="CANCELAR" onPress={() => this.setState({showModal: false})}/>
                                </View>
                                <View style={{width: 100}}>
                                    <Button title="LOGAR" onPress={this.logarIn}/>
                                </View>
                            </View>

                        </View>

                    </View>

                </Modal>

            </ImageBackground>

        )
    }

    initializeMethods() {
        this.cadastrar = this.cadastrar.bind(this)
        this.logar = this.logar.bind(this)
        this.isLogado = this.isLogado.bind(this)
        this.logarIn = this.logarIn.bind(this)
    }
}

const styles = StyleSheet.create({
    imgBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        color: '#000000'
    },
    btn: {
        backgroundColor: '#000000',
        opacity: 0.8,
        width: 150,
        alignItems: 'center',
        margin: 10,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center'
    },
    titleModal: {
        fontSize: 40,
        color: '#379CE9',
        marginTop:5,
        marginLeft: 5
    }

})