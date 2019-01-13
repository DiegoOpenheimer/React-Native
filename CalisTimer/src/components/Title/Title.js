import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Title = props => {
    const { stylesTitle, title, subTitle, stylesSubTitle, styleContent } = props
    return(
        <View style={styleContent}>
            <Text style={[styleComponent.title, stylesTitle]}>{title}</Text>
            <Text style={[styleComponent.subTitle, stylesSubTitle]}>{subTitle}</Text>
        </View>
    )
}

const styleComponent = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 20,
        textAlign: 'center'
    }
})

export default Title