import React from 'react'
import { StatusBar } from 'react-native'
import Toolbar from '../components/Toolbar'


const CreateTodo = ({ navigation }) => {

    return(
        <>
            <Toolbar title="Add Todo" statusBarHeight={StatusBar.currentHeight} action={() => navigation.goBack()} />
        </>
    )

}

export default CreateTodo