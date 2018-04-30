import React, { Component } from 'react'
import { View, ImageBackground, Image, StyleSheet, FlatList, StatusBar, TouchableOpacity, ToastAndroid, ScrollView, TouchableNativeFeedback, ActivityIndicator} from 'react-native'
import Modal from 'react-native-modal'
import { Card, Text, Avatar, Divider, SearchBar } from 'react-native-elements'
import {NavigationActions} from "react-navigation"
import Spinner from 'react-native-loading-spinner-overlay'
import Pokedex from 'pokedex-promise-v2'
import firebase from '../FirebaseConnection'


export default class Pokemon extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'Pokemon',
        headerStyle: {
            backgroundColor: '#4000FF'
        },
        headerTitleStyle: {
            color: '#FFF',
            marginRight: 20
        },
        headerRight:
            (<TouchableOpacity onPress={() => {
               firebase.auth().signOut().then(() =>{
                navigation.dispatch(NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Home'})
                    ]
                }))
                ToastAndroid.show("Deslogado com sucesso", ToastAndroid.SHORT)
               })
            }}>
                <View style={{width: 150, justifyContent: 'center', alignItems: 'flex-end', right: 10}}>
                    <Text style={{color: '#FFF', fontSize: 22}}>Sair</Text>
                </View>
            </TouchableOpacity>),
        tabBarLabel: 'Pokemon'
    })

    constructor(props) {
        super(props)
        this.state = {
            pokemons:[],
            screenPokemons:[],
            controller: true
        }
        this.interval = {
            limit:20,
            offset:-20
        }
        let options = {
            protocol: 'https',
            versionPath: '/api/v2/',
          }
        this.poke = new Pokedex(options)
        this.logout = this.logout.bind(this)
        this.morePokemons = this.morePokemons.bind(this)
        this.searchPokemon = this.searchPokemon.bind(this)
        this.updateState = this.updateState.bind(this)
     }

     updateState() {
        let s = this.state
        this.setState({screenPokemons:s.pokemons, controller: true})
     }

     searchPokemon(text) {
        this.setState({controller: false})
        if(text.trim() !== '') {
            let listPokemon = this.state.pokemons.filter( content => content.name.includes(text.toLowerCase()))
            this.setState({screenPokemons: listPokemon})
        } else {
            this.setState({controller: true})
            this.setState({screenPokemons: [...this.state.pokemons]})
        }
     }

     morePokemons() {
        this.interval.offset += 20
        this.poke.getPokemonsList(this.interval).then( data => {
            let s = [...this.state.pokemons]
            data.results.forEach( content => s.push(content))
            this.setState({pokemons: s, screenPokemons: s})

        }).catch( err => {
            this.poke.getPokemonsList(this.interval).then( data => {
                let s = [...this.state.pokemons]
                data.results.forEach( content => s.push(content))
                this.setState({pokemons: s, screenPokemons: s})
    
            }).catch( err => {
                this.poke.getPokemonsList(this.interval).then( data => {
                    let s = [...this.state.pokemons]
                    data.results.forEach( content => s.push(content))
                    this.setState({pokemons: s, screenPokemons: s})
        
                }).catch( err => {
                    this.logout()
                     ToastAndroid.show('Verifique conexão com internet', ToastAndroid.SHORT)
                })
                 ToastAndroid.show('Verifique conexão com internet', ToastAndroid.SHORT)
            })
             ToastAndroid.show('Verifique conexão com internet', ToastAndroid.SHORT)
        })
     }

    logout() {
        firebase.auth().signOut().then(() => {
            this.props.navigation.dispatch(NavigationActions.reset({
                index:0,
                actions: [
                    NavigationActions.navigate({routeName:'Home'})
                ]
            }))
        })
    }

    render() {
        return(
            <ImageBackground source={require('../assets/img/PlanoFundo.jpg')} style={styles.container}>
                <StatusBar hidden={true} />
                <SearchBar
                    placeholder="Buscar pokemon"
                    selectionColor="#4000FF"
                    round
                    containerStyle={{
                        backgroundColor:'#4000ff',
                        borderTopWidth:1,
                        borderTopColor:'#4000ff',
                        borderBottomWidth:0
                    }}
                    inputStyle={{
                        backgroundColor:'rgba(0,0,0,.3)',
                        color:'#FFF'
                    }}
                    icon={{color:'#FFF'}}
                    placeholderTextColor="#FFF"
                    onChangeText={this.searchPokemon}
                    onClearText={this.updateState}
                    clearIcon={{color:'#FFF'}}                  
                />
                <FlatList 
                    ref="flatList"
                    data={this.state.screenPokemons}
                    renderItem={({item}) => <EachPokemon data={item}/>}
                    keyExtractor={(item, index) => index}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={this.state.controller && this.morePokemons}
                    ListFooterComponent={ this.state.controller &&  
                    <View style={{justifyContent:'center', alignItems:'center', height: 100}}>
                            <ActivityIndicator animating={true} color="#FFF" />
                    </View>
            }
                />
            </ImageBackground>
        )
    }

}

class EachPokemon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            loading: false,
            infoPokemon: {}
        }
        let options = {
            protocol: 'https',
            versionPath: '/api/v2/',
          }
        this.poke = new Pokedex(options)
        this.showPokemon = this.showPokemon.bind(this)
    }

    showPokemon() {
        this.setState({loading: true})
        this.poke.getPokemonByName(this.props.data.name).then( data => {
            this.setState({loading: false, modal:true, infoPokemon:data})
        }).catch( err => {
            this.setState({loading: false})
            ToastAndroid.showWithGravity('Falha com conexão', ToastAndroid.SHORT, ToastAndroid.CENTER)
        })
    }

    render() {
        return(
            <TouchableOpacity onPress={this.showPokemon} style={styles.container}>
            <Spinner visible={this.state.loading} cancelable={true} />
                <View style={styles.pokemon}>
                    <Image style={{width: 100, height:100}} resizeMode="contain" source={{uri:`https://pokeapi.co/media/img/${this.props.data.url.match(/\d+/g)[1]}.png`}} />
                    <View style={{flex:1, justifyContent:'center', alignItems:'center', right:5}}>
                        <Text style={styles.namePokemon}>{this.props.data.name}</Text>
                    </View>
                 </View>
            
                 <Modal isVisible={this.state.modal}
                    onBackdropPress={() => this.setState({modal: false})}
                    onBackButtonPress={() => this.setState({modal: false})}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                 >
                {
                    this.state.infoPokemon.name &&
                    <ScrollView>
                    <Card
                        titleStyle={{color: '#4000ff', fontSize: 20}}
                        title={this.state.infoPokemon.name}
                        containerStyle={{flex:1, borderRadius:10}}
                        >
                        <View style={{flexDirection:'row', marginBottom: 20}}>
                        <Avatar
                            xlarge
                            rounded
                            source={{uri: this.state.infoPokemon.sprites.back_default}}
                            activeOpacity={0.2}
                            />
                        <View style={{marginRight: 10, marginTop:10}}>
                        <Text h3> Height</Text>
                        <Text h4>     {'\u2022'}   {this.state.infoPokemon.height}</Text>
                        <Text h3> Weight</Text>
                        <Text h4>     {'\u2022'}   {this.state.infoPokemon.weight}</Text>
                        </View>
                        </View>
                        <Divider />
                        <View style={{marginBottom: 20}}>
                        <Text h3>Ability</Text>
                        {
                            this.state.infoPokemon.abilities.map( a => {
                                return(
                                    <Text h4 >{'\u2022'}  {a.ability.name}</Text>
                                )
                            })
                        }
                        </View>
                        <Divider />
                        <View style={{marginBottom: 20}}>
                        <Text h3>Stats</Text>
                        {
                            this.state.infoPokemon.stats.map( s => {
                                return(
                                    <Text h4 >{'\u2022'}  {s.stat.name}</Text>
                                )
                            })
                        }   
                        </View>
                        </Card>
                        </ScrollView>
                }
                 </Modal>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    pokemon: {
        flex:1,
        margin:15,
        borderRadius: 50,
        alignItems:'center',
    },
    namePokemon: {
        color:'#FFF',
        fontSize:14,
    }
})
