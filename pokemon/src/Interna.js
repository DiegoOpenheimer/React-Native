import React, {Component} from 'react'
import {View, Text, Image, ImageBackground, StyleSheet, StatusBar, TouchableOpacity, ToastAndroid} from 'react-native'
import {Card} from 'react-native-elements'
import firebase from '../FirebaseConnection'
import {NavigationActions} from 'react-navigation'

export default class Interna extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'Welcome',
        headerStyle: {
            backgroundColor: '#4000FF'
        },
        headerTitleStyle: {
            color: '#FFF',
            marginRight: 20
        },
        headerRight:
            <TouchableOpacity onPress={() => {
                firebase.auth().signOut().then(() => {
                    navigation.dispatch(NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName: 'Home'})
                        ]
                    }))
                    ToastAndroid.show('Deslogado com sucesso', ToastAndroid.SHORT)
                })
            }}>
                <View style={{width: 150, justifyContent: 'center', alignItems: 'flex-end', right: 10}}>
                    <Text style={{color: '#FFF', fontSize: 22}}>Sair</Text>
                </View>
            </TouchableOpacity>,
        tabBarLabel: 'Home'
    })

    constructor(props) {
        super(props)
        this.state = {}
        this.goPokemon = this.goPokemon.bind(this)
    }

    goPokemon() {
        this.props.navigation.navigate('Pokemon')
    }

    render() {
        return (
            <ImageBackground style={styles.container} source={require('../assets/img/PlanoFundo.jpg')}>
                <StatusBar hidden={true}/>
                <Card
                    image={require("../assets/img/pokemonTitle.png")}
                    imageProps={{resizeMode: 'contain'}}
                    containerStyle={{padding:10}}
                >
                    <TouchableOpacity onPress={this.goPokemon} style={{alignItems:'center'}}>
                        <Text style={styles.title}>Vamos começar - Clique Aqui</Text>
                    </TouchableOpacity>

                </Card>
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
    title: {
        color: '#4000ff',
        fontFamily: 'consoles',
        fontSize: 16,
        fontStyle:"italic"
    }
})