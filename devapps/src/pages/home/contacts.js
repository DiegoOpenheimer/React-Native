import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { getAllContacts, createChat } from '../../actions/chatAction'
import { connect } from 'react-redux'

import ContactsList from '../components/listContacts'

export class Contacts extends Component {
    static navigationOptions = {
        header:null,
        tabBarLabel:'Contatos'
    }

    constructor(props) {
        super(props)
        this.props.getAllContacts(this.props.user.uid)
     }

    goBack(){
        this.props.navigation.goBack()
        return true
    }
 
    clickItem(item) {
        this.props.createChat(this.props.user.uid, item.key)
        this.props.navigation.navigate('conversasList')
    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.props.contacts}
                    renderItem={({item}) => <ContactsList onPress={this.clickItem.bind(this, item)} data={item} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        padding:10
    }
})

const mapStateToProps = state => {
    return { contacts: state.chatReducer.contacts, user:{uid:state.auth.uid} }
}

export default connect(mapStateToProps, { getAllContacts, createChat })(Contacts)