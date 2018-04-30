import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CardConversa = props => {
    let myStyles = {
        backgroundColor: props.data.id === props.me ? '#9999FF':'#ffbf00',
        alignSelf: props.data.id === props.me ? 'flex-end' : 'flex-start',
        info: {
            textAlign:props.data.id === props.me ? 'right' : 'left'
        }
    }  
    return (
        <View style={[styles.container, myStyles]}>
            <Text style={styles.message}>
                {props.data.message}
            </Text>
            <Text style={[styles.info, myStyles.info]}>
                {props.data.date}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '80%',
        margin: 10,
        padding: 10,
        borderRadius:2
    },
    message: {
        fontSize: 18
    },
    info: {
        marginTop:5
    }
})

export default CardConversa