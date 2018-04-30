import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation'

import ConversaStack from './conversaStack'
import Contacts from './home/contacts'
import Config from './home/config'

const Home = TabNavigator({
    ConversaStack:{
        screen:ConversaStack,
        navigationOptions: {
            header:null
        }
    },
    Contacts: {
        screen:Contacts
    },
    Config: {
        screen:Config
    }
})

export default Home