import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'

export default class Feed extends React.Component {

    render() {
        return(
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor="rgba(0, 0, 0, .4)" />
                <Text>Feed.</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})