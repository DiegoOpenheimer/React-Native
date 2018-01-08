import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, FlatList, Button, ToastAndroid } from 'react-native'
import { NavigationActions } from 'react-navigation'
import firebase from '../FirebaseConfig'
import HistoricoItem from './historicoItem'


export default class Interno extends Component {

    static navigationOptions = {
        header:null
    }

    constructor(props) {
        super(props)
        this.state = {
            saldo: 0,
            database:{},
            historico: []
        }
        this.goReceita = this.goReceita.bind(this)
        this.goDespesa = this.goDespesa.bind(this)
        this.logout = this.logout.bind(this)
        firebase.database().ref('users').child(firebase.auth().currentUser.uid).on('value', snapshot =>{
            this.setState({
                saldo: snapshot.val().saldo,
                database: snapshot.val()
            })
        })

        firebase.database().ref('historico').child(firebase.auth().currentUser.uid).limitToLast(20).on('value', data => {
            let historico = []
            data.forEach( d => {
                historico.push({
                    key: d.key,
                    title: d.val().title,
                    valor: d.val().valor
                })
                this.setState({historico: historico})
            })

        })

        firebase.database().ref('historico').child(firebase.auth().currentUser.uid).limitToLast(20).once('value', data => {
            let historico = []
            data.forEach( d => {
                historico.push({
                    key: d.key,
                    title: d.val().title,
                    valor: d.val().valor
                })
                this.setState({historico: historico})
            })

        })

    }

    goDespesa() {
        this.props.navigation.navigate('Despesa')
    }

    goReceita() {
        this.props.navigation.navigate('Receita')
    }

    logout() {
        firebase.auth().signOut()
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' })
            ]
        }))

        ToastAndroid.show('Deslogado com sucesso', ToastAndroid.SHORT)
    }



    render() {
        return(
            <ImageBackground source={require('../assets/imagem/fundo.jpg')} style={styles.container}>
                <View style={styles.titleSaldo}>
                    <Text style={styles.saldo}>Saldo = R${this.state.saldo.toFixed(2)}</Text>
                </View>
                <FlatList
                    style={styles.historico}
                    data={this.state.historico}
                    renderItem={({item}) => <HistoricoItem data={item} />}
                />
                <View style={{height:80, flexDirection:'row', justifyContent:'space-around', backgroundColor:'#EEE', borderTopWidth: 2, borderTopColor:'#ccc',
                alignItems:'center'}}>
                    <View style={{height:50, width:100}}>
                        <Button onPress={this.goReceita} title="+ Receita" />
                    </View>
                    <View style={{height:50, width:100}}>
                        <Button onPress={this.goDespesa} title="+ Despesa" />
                    </View>
                    <View style={{height:50, width:100}}>
                        <Button onPress={this.logout} title="SAIR" />
                    </View>
                </View>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    titleSaldo: {
        height:100,
        backgroundColor:'#ffff00',
        alignItems:'center',
        justifyContent:'center'
    },
    saldo: {
        fontSize: 30,
        color:'black'
    },
    historico: {
        flex:1
    }
})
