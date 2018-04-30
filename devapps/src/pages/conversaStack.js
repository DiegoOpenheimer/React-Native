import React from 'react'
import { StackNavigator } from 'react-navigation'

import ConversasList from './home/conversasList'
import ConversaInterna from './conversaInterna'

const ConversaStack = StackNavigator({
    ConversasList:{
        screen:ConversasList
    },
    ConversaInterna:{
        screen:ConversaInterna
    }
})

export default ConversaStack