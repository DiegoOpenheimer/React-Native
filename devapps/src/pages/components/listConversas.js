import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

const RenderConversas = props => (
    <TouchableHighlight onPress={props.onPress} style={listContactsStyle.buttonArea} underlayColor="#DDDDDD">
        <Text>{props.data.name}</Text>
    </TouchableHighlight>
)

const listContactsStyle = StyleSheet.create({
    buttonArea: {
        height:40,
        flex:1,
        justifyContent:'center',
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'#CCCCCC'
    }
})

export default RenderConversas
