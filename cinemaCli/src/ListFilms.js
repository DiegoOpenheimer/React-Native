import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, ImageBackground, Image, ScrollView, ToastAndroid, StatusBar } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { NavigationActions } from 'react-navigation'

export default class ListFilms extends Component {
    static navigationOptions = {
        title:'Lista de filmes',
        headerStyle: {
            backgroundColor:'red'
        },
        headerTitleStyle: {
            color:'#FFF'
        },
        headerBackTitleStyle: {
            color:'#FFF'
        },
        headerTintColor:'#FFF',
        gesturesEnabled: true
    }
    constructor(props) {
        super(props)
        this.state = {
            filmes: [],
            loading:true
        }
       
        fetch('https://filmespy.herokuapp.com/api/v1/filmes')
            .then( response => response.json())
            .then( data => {
                let s = this.state
                s.filmes = data.filmes
                s.loading = false
                this.setState(s)
            })
            .catch( err => {
                this.props.navigation.dispatch(NavigationActions.reset({
                    index:0,
                    actions:[
                        NavigationActions.navigate({routeName:'Home'})
                    ]
                }))
                ToastAndroid.show('Erro com conexão', ToastAndroid.LONG)
            })
    }
    render() {
        return(
               <View style={styles.container}>
               <StatusBar backgroundColor="#D33C3C"/>
                    <ImageBackground source={require('../assets/images/popcorn-1085072_1920.jpg')} style={styles.img}>
                    <Spinner visible={this.state.loading} />
                    <FlatList 
                        data={this.state.filmes}
                        renderItem={({item}) => <Filme data={item} />}
                        keyExtractor={(item, index) => item.nome}
                    />
                    </ImageBackground>
                </View>
            )
    
    }
}

class Filme extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <View style={styles.containerFilm}>
                <Image resizeMode="contain" source={{uri:this.props.data.poster.replace('http:', 'https:')}} style={styles.imagem} />
                <View style={styles.containerText}>
                   <Text style={styles.titleFilme}>{this.props.data.nome}</Text>
                   <Text style={styles.dateFilme}>{this.props.data.data}</Text>
                   <ScrollView style={styles.scroll}>
                    <Text style={styles.sinopseFilme}>{this.props.data.sinopse}</Text>
                   </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    containerFilm: {
        flex:1,
        flexDirection:'row',
        margin:5,
        borderBottomColor:"#CCC",
        borderBottomWidth:1,
        height:250,
        backgroundColor:'#FFF',
        padding:10,
        borderRadius:5
    },
    containerText: {
        flex:1,
        flexDirection:'column',
        marginLeft:10
    },
    img: {
        flex:1
    },
    imagem: {
        width:90,
        height:120
    },
    titleFilme: {
        fontSize:22,
        color:'#000',
        textShadowColor:'#CCC',
        textShadowOffset: {width:1, height:1}
    },
    dateFilme: {
        color:'red',
        fontSize:14,
        textShadowColor:'#CCC',
        textShadowOffset: {width:1, height:1}
    },
    sinopseFilme: {
        color:'#000',
        fontSize:18,
    },
    scroll: {
        marginTop:5
    }
})