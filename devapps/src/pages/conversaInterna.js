import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, TouchableHighlight, Image, BackHandler, TextInput, Keyboard, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { setActive, sendMesssage, getMessages, setMessages } from '../actions/chatAction'
import CardConversa from './components/cardConversa'

export class ConversaInterna extends Component {
    static navigationOptions = ({navigation}) => ({
        title:navigation.state.params.name,
        headerLeft:(
            <TouchableHighlight underlayColor={undefined} onPress={()=>{
                navigation.state.params.functionBack()
            }}>
                <Image source={require('react-navigation/src/views/assets/back-icon.png')} style={{width:25,height:25,marginLeft:20}} />
            </TouchableHighlight>
        ),
        tabBarVisible:false
    })

    constructor(props) {
        super(props)
        this.state = {
            message: undefined
        }
        this.goBack = this.goBack.bind(this)
    }

    goBack() {
      this.props.setMessages(new Array())
      this.props.navigation.goBack()
      this.props.setActive(undefined)
      return true
    }

    componentWillMount() {
        this.props.getMessages(this.props.activeChat)
    }

    componentDidMount() {
      this.props.navigation.setParams({functionBack: this.goBack})
      BackHandler.addEventListener('hardwareBackPress', this.goBack)
    }

    componentWillUnmount() {
       BackHandler.removeEventListener('hardwareBackPress', this.goBack)
    }

    checkMessage() {
        if(this.state.message) {
             this.props.sendMesssage(this.props.uid, this.props.activeChat, this.state.message)
             this.refs.inputMessage.clear()
             this.refs.inputMessage.focus()
        }
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
                />
                </View>
                <View style={styles.footer}>
                <TextInput multiline={true} onChangeText={message=>this.setState({message})} ref="inputMessage" style={styles.footerInput} />
                <TouchableHighlight style={{width:'12%', justifyContent:'center'}} underlayColor="#EDEDED" onPress={this.checkMessage.bind(this)}>
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
        width:'88%',
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

export default connect(mapStateToProps, { setActive, sendMesssage, getMessages, setMessages })(ConversaInterna)
