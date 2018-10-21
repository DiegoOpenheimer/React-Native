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
        title: 'Items',
        headerStyle: {
            backgroundColor: '#4000FF',
            height: StatusBar.currentHeight + 56,
            paddingTop: StatusBar.currentHeight,
            elevation: 0
        },
        headerTitleStyle: {
            color: '#FFF',
            marginRight: 20
        },
        headerRight:
            <TouchableOpacity onPress={() => {
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
            </TouchableOpacity>,
        tabBarLabel: 'Item'
    })

    constructor(props) {
        super(props)
        this.state = {
            items:[],
            screenItem:[],
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
        this.moreItems = this.moreItems.bind(this)
        this.searchItem = this.searchItem.bind(this)
        this.updateState = this.updateState.bind(this)
     }

     componentDidMount() {
         this.moreItems()
     }

     updateState() {
        let s = this.state
        this.setState({screenItem:s.items, controller: true})
     }

     searchItem(text) {
        this.setState({controller: false})
        if(text.trim() !== '') {
            let listItem = this.state.items.filter( content => content.name.includes(text.toLowerCase()))
            this.setState({screenItem: listItem})
        } else {
            this.setState({controller: true})
            this.setState({screenItem: [...this.state.items]})
        }
     }

     moreItems() {
        this.interval.offset += 20
        this.poke.getItemsList(this.interval).then( data => {
            let s = [...this.state.items]
            data.results.forEach( content => s.push(content))
            this.setState({items: s, screenItem: s})
        }).catch( err => {
            this.poke.getItemsList(this.interval).then( data => {
                let s = [...this.state.items]
                data.results.forEach( content => s.push(content))
                this.setState({items: s, screenItem: s})
    
            }).catch( err => {
                this.poke.getItemsList(this.interval).then( data => {
                    let s = [...this.state.items]
                    data.results.forEach( content => s.push(content))
                    this.setState({items: s, screenItem: s})
        
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
                <StatusBar translucent={true} backgroundColor={"rgba(0,0,0,.2)"} />
                <SearchBar
                placeholder="Buscar item"
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
                onChangeText={this.searchItem}
                onClearText={this.updateState}
                clearIcon={{color:'#FFF'}}                  
            />
                <FlatList 
                    ref="flatList"
                    data={this.state.screenItem}
                    renderItem={({item}) => <EachItem data={item} />}
                    keyExtractor={(item, index) => index}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={this.state.controller && this.moreItems}
                    ListFooterComponent={  this.state.controller &&
                    <View style={{justifyContent:'center', alignItems:'center', height: 100}}>
                            <ActivityIndicator animating={true} color="#FFF" />
                    </View>
            }
                />
            </ImageBackground>
        )
    }

}

class EachItem extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            loading: false,
            infoItem: {}
        }
        let options = {
            protocol: 'https',
            versionPath: '/api/v2/',
          }
        this.poke = new Pokedex(options)
        this.showItem = this.showItem.bind(this)
    }

    showItem() {
        this.setState({loading: true})
        this.poke.getItemByName(this.props.data.name).then( data => {
            this.setState({loading: false, modal:true, infoItem:data})
        }).catch( err => {
            this.setState({loading: false})
            ToastAndroid.showWithGravity('Falha com conexão', ToastAndroid.SHORT, ToastAndroid.CENTER)
        })
    }

    render() {
        return(
            <TouchableOpacity onPress={this.showItem} style={styles.container}>
            <Spinner visible={this.state.loading} cancelable={true} />
                <View style={styles.pokemon}>
                    <Image resizeMode="contain" style={{width:50, height:50}} source={{uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/' + this.props.data.name + '.png'}} />
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
                    <View>
                    {
                    this.state.infoItem.name &&
                    <ScrollView>
                    <Card
                        titleStyle={{color: '#4000ff', fontSize: 20}}
                        title={this.state.infoItem.name}
                        containerStyle={{flex: 1,borderRadius:10}}
                        >
                        <View style={{flexDirection:'row', marginBottom: 20}}>
                        <Avatar
                            large
                            rounded
                            source={{uri: this.state.infoItem.sprites.default}}
                            activeOpacity={0.2}
                            />
                            <View style={{marginRight: 10, marginTop:10, marginLeft:20}}>
                                <Text h3> Cost</Text>
                                <Text>     {'\u2022'}   {this.state.infoItem.cost}</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={{marginBottom: 20}}>
                        <Text h3>Short_effect</Text>
                              {
                                  this.state.infoItem.effect_entries.map( content => {
                                      return(
                                        <Text key={content.short_effect}>  {'\u2022'}  {content.short_effect}</Text>
                                      )
                                  })
                              }       
                              
                        <Text h3>Effect</Text>
                            {
                                this.state.infoItem.effect_entries.map( content => {
                                    return(
                                        <Text key={content.effect}>  {'\u2022'}  {content.effect}</Text>
                                    )
                                })
                            }
                                                                                        
                        </View>
                        </Card>
                        </ScrollView>
                }
                    </View>
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
