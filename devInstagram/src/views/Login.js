import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Login extends React.Component {
    render() {
        return(
            <View style={style.container}>
                <Text>Login</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
