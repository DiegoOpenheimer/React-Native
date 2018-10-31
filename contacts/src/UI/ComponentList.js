import React from 'react'
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import PERSON from '../../images/person.png'

const buildImage = (person) => {
    if (person.image) {
        return <Image style={{width:80, height: 80, borderRadius:40}} source={person.image} resizeMode="cover" />
    } else {
        return <Image style={{width:80, height: 80}} source={PERSON} resizeMode="contain" />
    }
}

const ListItem = props => {
    return (
        <TouchableWithoutFeedback onLongPress={() => props.onClick(props.item)}>
            <View style={styles.card}>
                {buildImage(props.item)}
                <View style={{marginLeft:10}}>
                    <Text style={{fontSize:18}}>{props.item.name}</Text>
                    <Text style={{fontSize:16}}>{props.item.email}</Text>
                    <Text style={{fontSize:14}}>{props.item.phone}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ListItem

const styles = StyleSheet.create({
    card: {
        flex:1,
        height:100,
        margin: 10,
        padding:10,
        backgroundColor:'#FFF',
        elevation:5,
        borderRadius:10,
        flexDirection: 'row',
        alignItems:'center'
    }
})

