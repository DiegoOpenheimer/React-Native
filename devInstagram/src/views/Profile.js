import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'


export default class Profile extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Profile',
            headerStyle: {
                backgroundColor: '#4da2d8',
                height: 56 + StatusBar.currentHeight,
                paddingTop: StatusBar.currentHeight
            },
            headerTitleStyle: {
                color: '#FFF',
            },
            headerTintColor: '#FFF',
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Profile</Text>
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