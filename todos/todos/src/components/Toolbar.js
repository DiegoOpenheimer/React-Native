import React from 'react'
import { Appbar } from 'react-native-paper'

const ToolBar = ({ title, statusBarHeight, action }) => {

    const Action = action ?
    <Appbar.BackAction
    onPress={action}
    /> : null

    return (
        <Appbar.Header statusBarHeight={statusBarHeight} >
            {Action}
            <Appbar.Content titleStyle={ !action ? {textAlign: 'center'} : null} title={title} />
        </Appbar.Header>
    )
}

export default ToolBar