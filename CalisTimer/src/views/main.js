import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Main extends React.Component {

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>CalisTimer</Text>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 48
    }
})
