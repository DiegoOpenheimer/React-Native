import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const Button = props => {
    return(
        <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
            <Text style={props.styleText}>{props.children}</Text>
        </TouchableOpacity>
    )
}


export default Button
