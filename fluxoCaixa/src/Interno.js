import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'

export default class Interno extends Component {

    static navigationOptions = {
        header:null
    }

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <ImageBackground source={require('../assets/imagem/fundo.jpg')} style={styles.container}>
                <View>
                    <Text>Olá</Text>
                </View>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})
