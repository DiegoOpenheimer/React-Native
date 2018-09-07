import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Home extends React.Component {
    render() {
        return(
            <View style={style.container}>
                <Text>Home</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Home