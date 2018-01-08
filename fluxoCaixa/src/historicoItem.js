import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid} from 'react-native'
import firebase from '../FirebaseConfig'

export default class HistoricoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bg: this.props.data.title == 'Receita' ? '#07D826' : 'red'
        }

        this.excluir = this.excluir.bind(this)
    }

    excluir() {
        Alert.alert('Atenção', 'Deseja retirar esse item? ', [
            {text: 'Cancelar'},
            {text:'ok', onPress: () => {
                let valor = this.props.data.valor
                firebase.database().ref('historico').child(firebase.auth().currentUser.uid)
                    .child(this.props.data.key).remove()
                    .then( () => {
                        firebase.database().ref('users').child(firebase.auth().currentUser.uid)
                            .child('saldo').once('value', data => {
                                let saldo = data.val()
                                this.props.data.title == 'Receita' ? saldo -= valor : saldo += valor
                            firebase.database().ref('users').child(firebase.auth().currentUser.uid)
                                .child('saldo').set(saldo)
                        })
                    }).catch( err => {
                        ToastAndroid.show("Falha ao excluir", ToastAndroid.SHORT)
                })
            }}
        ])
    }

    render() {
        return (
            <View style={[styles.container, {backgroundColor: this.state.bg}]}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.title}>{this.props.data.title}</Text>
                    <Text
                        style={styles.valor}>R$ {this.props.data.title == 'Despesa' ? ' -' : ' +'} {this.props.data.valor.toFixed(2)}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start'}}>
                    <TouchableOpacity onPress={this.excluir}>
                        <Text style={{fontSize: 16, color: 'white'}}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        margin: 10,
        height: 80,
        padding: 10,
        borderRadius: 8
    },
    title: {
        fontSize: 20,
        color: '#FFF'
    },
    valor: {
        fontSize: 18,
        color: '#FFF'
    }
})