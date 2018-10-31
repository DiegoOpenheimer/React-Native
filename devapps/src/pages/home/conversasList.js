import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { getTalks, createChat, toogleLoadingController } from '../../actions/chatAction'

import RenderConversas from '../components/listConversas'

export class ConversasList extends React.Component {
    static navigationOptions = {
        header:null,
        tabBarLabel:'Conversas',
    }

    constructor(props) {
        super(props)
        this.props.getTalks(this.props.uid)
        this.props.chats.length === 0 && this.props.toogleLoadingController( true )       
    }

    componentDidUpdate() {
        if(this.props.activeChat) {
            this.props.chats.map( chat => {
                if(chat.key == this.props.activeChat) {
                    this.props.navigation.navigate('ConversaInterna', { name: chat.name })
                }
            })
        }
    }

    goConversa( item ) {
         this.props.createChat(this.props.uid, item.idContact)
    }

    render(){
        return(
            <View style={styles.container}>
            {
                this.props.loading &&
                <ActivityIndicator size="large" color="#00ff00" />
            }
                <FlatList
                  data={this.props.chats}
                  renderItem={({item})=><RenderConversas data={item} onPress={this.goConversa.bind(this, item)} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center'    
    }
})

const mapStateToProps = state => {
    return {
        chats: state.chatReducer.chats,
        activeChat: state.chatReducer.activeChat,
        uid: state.auth.uid,
        loading:state.chatReducer.loadingController
    }
}

export default connect(mapStateToProps, { getTalks, createChat, toogleLoadingController })(ConversasList)
