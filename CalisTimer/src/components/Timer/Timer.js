import React from 'react'
import { View, Text } from 'react-native'

const Timer = ({time, styleText, appendText}) => {

    const minutes = parseInt(time / 60)
    const seconds = parseInt(time % 60)
    const formatter = time => time.toString().padStart(2, '0')
    return (
        <View>
            <Text style={styleText}>{formatter(minutes)}:{formatter(seconds)}{appendText}</Text>
        </View>
    )
}

export default Timer