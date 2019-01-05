import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Title from '../../components/Title/Title'

const Emon = props => {
    return(
        <View style={styles.container}>
            <Title style={styles.title} stylesTitle={styles.title} stylesSubTitle={styles.subTitle} title='Emon' subTitle='Every Minute On The Minute' />
        </View>
    )
}

Emon.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#d6304a',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#FFF',
        fontFamily: 'Ubuntu-Bold',
        fontSize: 48
    },
    subTitle: {
        color: '#FFF'
    }
})

export default Emon