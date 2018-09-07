import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'

class Preload extends Component {

    componentDidMount() {
        switch (this.props.status) {
            case 1:
                this.changeView('Home')
                break
            default:
                this.changeView('Login')
        }
    }

    changeView = (view) => {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: view})]
        }))
    }

    render() {
        return(
            <View style={style.container}>
                <Text>Preload {JSON.stringify(this.props)}</Text>
            </View>
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

export default connect(mapStateToProps)(Preload)