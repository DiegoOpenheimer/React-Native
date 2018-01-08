import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, ImageBackground, TouchableNativeFeedback, ToastAndroid, Alert} from 'react-native'
import firebase from '../FirebaseConfig'

export default class Despesa extends Component {
    static navigationOptions = {
        title: 'Adicionar Receita',
        headerStyle: {
            backgroundColor: '#FFFF00'
        },
        headerTintColor: '#000',
        gesturesEnabled: true
    }

    constructor(props) {
        super(props)
        this.state = {
            valor: ''
        }
        this.adicionar = this.adicionar.bind(this)
        this.atualizarSaldo = this.atualizarSaldo.bind(this)
    }

    atualizarSaldo() {
        let userUid = firebase.auth().currentUser.uid
        firebase.database().ref('users').child(userUid).child('saldo').once('value', data => {
            let saldoUser = data.val()
            let res = parseFloat(saldoUser) - parseFloat(this.state.valor)
            firebase.database().ref('users').child(userUid).child('saldo').set(res)
        })
    }

    adicionar() {
        if(this.state.valor.trim() !== '') {

            firebase.database().ref('historico').child(
                firebase.auth().currentUser.uid
            ).push({
                title: 'Despesa',
                valor: parseFloat(this.state.valor.replace(',', '.'))
            }).then(() => {
                this.atualizarSaldo()
                this.inputRef.clear()
                ToastAndroid.show('Valor adicionado', ToastAndroid.SHORT)
                Alert.alert('Atenção', 'Deseja adicionar mais? ',[
                    { text: 'Não', onPress: () => {
                            this.props.navigation.goBack()
                        }},
                    { text: 'Sim'}
                ])
            }).catch( () => {
                ToastAndroid.show('Error', ToastAndroid.SHORT)
            })
        } else {
            Alert.alert('Informe valor')
        }

    }

    render() {
        return (
            <ImageBackground source={require("../assets/imagem/fundo.jpg")} style={styles.container}>
                <Text style={styles.formInformation}>Informe a quantidade de entrada de receita: </Text>
                <TextInput
                    ref={ ref => this.inputRef = ref}
                    autoFocus={true}
                    placeholderTextColor="#FFF"
                    placeholder="R$ Valor"
                    keyboardType="numeric"
                    onChangeText={text => this.setState({valor: text})}
                    underlineColorAndroid="transparent"
                    style={styles.input}
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableNativeFeedback
                        onPress={this.adicionar}
                        background={TouchableNativeFeedback.SelectableBackground()}
                    >

                        <View style={styles.adicionar}>
                            <Text style={styles.btnAdicionar}>Adicionar</Text>
                        </View>

                    </TouchableNativeFeedback>
                </View>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    formInformation: {
        fontSize: 16,
        color: '#000',
        margin: 10
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        paddingLeft: 25,
        color: 'white',
        borderRadius: 25,
        margin: 5
    },

    adicionar: {
        backgroundColor: '#379CE9',
        width: 200,
        height: 50,
        justifyContent:'center',
        borderRadius: 20,
        top: 20
    },
    btnAdicionar: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20
    }

})