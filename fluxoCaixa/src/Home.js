import React, {Component} from 'react'
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native'

export default class Home extends Component {

    static navigationOptions = {
        header: null
    }


    constructor(props) {
        super(props)
        this.state = {
            teste:'teste'
        }

        this.initializeMethods.bind(this)()
    }

    cadastrar() {
        this.props.navigation.navigate('Cadastrar')
    }

    logar() {
        alert('ok')
    }

    render() {
        return (
            <ImageBackground source={require('../assets/imagem/fundo.jpg')} style={styles.imgBackground}>
                <Text style={styles.title}>Fluxo de caixa v1.0</Text>
                <TouchableOpacity style={styles.btn} onPress={this.cadastrar}>
                    <Text style={{color:'#FFFFFF', fontSize:20}}>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={this.logar}>
                    <Text style={{color:'#FFFFFF', fontSize:20}}>Login</Text>
                </TouchableOpacity>
            </ImageBackground>

        )
    }

    initializeMethods() {
        this.cadastrar = this.cadastrar.bind(this)
        this.logar = this.logar.bind(this)
    }
}

const styles = StyleSheet.create({
    imgBackground: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    title: {
        fontSize: 30,
        color:'#000000'
    },
    btn: {
        backgroundColor:'#000000',
        opacity:0.8,
        width: 150,
        alignItems:'center',
        margin:10,
        height:40,
        borderRadius: 5,
        justifyContent:'center'
    }
})