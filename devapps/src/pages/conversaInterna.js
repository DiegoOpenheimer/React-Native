import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, TouchableHighlight, Image, TextInput, Keyboard, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { setActive, sendMessage, getMessages, setMessages } from '../actions/chatAction'
import CardConversa from './components/cardConversa'
import * as Progress from 'react-native-progress'
import ImagePicker from 'react-native-image-picker'

export class ConversaInterna extends Component {
    static navigationOptions = ({navigation}) => ({
        title:navigation.state.params.name,
        tabBarVisible:false,
        swipeEnabled:false
    })

    constructor(props) {
        super(props)
        this.state = {
            message: undefined
        }
    }

    componentWillMount() {
        this.props.getMessages(this.props.activeChat)
    }

    componentWillUnmount() {
      this.props.setMessages(new Array())
      this.props.setActive(undefined)
    }

    checkMessage() {
        if(this.state.message) {
            let type = 'text'
             this.props.sendMessage(this.props.uid, this.props.activeChat, this.state.message, type)
             this.refs.inputMessage.clear()
             this.refs.inputMessage.focus()
        }
    }

    chooseFile() {
        ImagePicker.showImagePicker(undefined, response => {
            if(response.uri) {
                let type = 'image', dataUrl = 'data:image/jpeg;base64,'+response.data
                     this.props.sendMessage(this.props.uid, this.props.activeChat, dataUrl, type, {
                         width: response.width,
                         height: response.height
                     })
            } else if(response.error) {
                ToastAndroid.show('Error to start image picker', ToastAndroid.SHORT)
            }
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.areaChat}>
                <FlatList
                    ref="listConversa"
                    data={this.props.messages}
                    renderItem={({item})=><CardConversa me={this.props.uid} data={item} />}
                    onContentSizeChange={()=>this.refs.listConversa.scrollToEnd({animated: true})}
                    onLayout={()=>this.refs.listConversa.scrollToEnd({animated:true})}
                    keyExtractor={(item, index)=>index.toString()}
                />
                 </View>
                <View style={styles.footer}>
                <TouchableHighlight style={{flex:0.2, justifyContent:'center'}} underlayColor="#EDEDED" onPress={this.chooseFile.bind(this)}>
                    <Image style={styles.imgFooter} resizeMode={Image.resizeMode.contain} source={require('../../assets/images/anexo.png')} />
                </TouchableHighlight>
                <TextInput multiline={true} onChangeText={message=>this.setState({message})} ref="inputMessage" style={styles.footerInput} />
                <TouchableHighlight style={{flex:0.2, justifyContent:'center'}} underlayColor="#EDEDED" onPress={this.checkMessage.bind(this)}>
                    <Image style={styles.imgFooter} resizeMode={Image.resizeMode.contain} source={require('../../assets/images/icons8-enviado-48.png')} />
                </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    areaChat: {
        flex:1
    },
    footer:{
        minHeight:40,
        backgroundColor:'#FFF',
        flexDirection: 'row',
        paddingLeft:5
    },
    footerInput:{
       flex:1
    },
    imgFooter: {
        width:40,
        height:38
    }
})

const mapStateToProps = state => {
    return {
        activeChat:state.chatReducer.activeChat,
        uid:state.auth.uid,
        messages:state.chatReducer.messages
    }
}

export default connect(mapStateToProps, { setActive, sendMessage, getMessages, setMessages })(ConversaInterna)

