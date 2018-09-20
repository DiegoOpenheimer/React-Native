import React, { Component } from 'react'
import { Text, StyleSheet, ImageBackground, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'
import LOGO from '../assets/bg.jpg'

import { checkLogin } from '../actions/auth'

class Preload extends Component {

    constructor(props) {
        super(props)
        this.props.checkLogin(this.changeView)
    }

    changeView = (view) => {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: view})]
        }))
    }

    render() {
        return(
            <ImageBackground style={style.container} source={LOGO}>
                <Text>Preload</Text>
            </ImageBackground>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = state => {
    return {
        status: state.auth.status
    }
}

export default connect(mapStateToProps, { checkLogin })(Preload)