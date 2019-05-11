import React from 'react'
import { TouchableOpacity } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const IconButton = ({ onPress }) => {

    return (
        <TouchableOpacity onPress={ onPress } >
            <EvilIcons 
                name="trash"
                color="#FF0000"
                size={40}
            />
        </TouchableOpacity>
    )

}

export default IconButton
