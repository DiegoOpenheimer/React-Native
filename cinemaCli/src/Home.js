import React, { Component } from 'react'
import { View, Text, StyleSheet,ImageBackground, TouchableOpacity, StatusBar  } from 'react-native'

export default class Home extends Component {
    static navigationOptions = {
        header:null
    }
    constructor(props) {
        super(props)
        this.state = {}
        this.listFilmsPage = this.listFilmsPage.bind(this)
    }

    listFilmsPage() {
        this.props.navigation.navigate('ListFilms')
    }

    render() {
        return(
            <View style={styles.container}>
            <StatusBar backgroundColor="#D33C3C"/>
                <ImageBackground source={require('../assets/images/popcorn-1085072_1280.jpg')} style={styles.imageBackground}>
                    <Text style={[styles.title, styles.positionTitle]}>Filmes que estão no cinema</Text>
                    <Text style={styles.title}>Vamos conferir os lançamentos</Text>
                    <TouchableOpacity onPress={this.listFilmsPage} style={styles.btn}>
                        <Text style={styles.btnText}>Clique Aqui</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1
    },
    imageBackground: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    positionTitle: {
        position:'relative',
        top:-150
    },
    title: {
        fontSize:36,
        color:'#FFF',
        textShadowOffset:{ width:3, height:3 },
        textShadowColor:'#000',
        textAlign:'center',
        fontWeight:'900'    
    },
    btn: {
        marginTop:20,
        backgroundColor:'red',
        padding:10,
        width:150,
        height:150,
        borderRadius:75,
        justifyContent:'center',
        alignItems:'center',
    },
    btnText: {
        color:'#FFF',
        fontSize:20
    }
})