import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { accountOff, accountOn } from '../actions/auth'
import { NavigationActions } from 'react-navigation'
import firebase from '../FirebaseConnection'

export  class Preload extends Component {

    static navigationOptions = {
        header: null
    }
    
    constructor(props) {
        super(props)
        this.directPage = this.directPage.bind(this)
        firebase.auth().onAuthStateChanged(this.directPage)
    }

    directPage(user){
        if(user){
            this.props.accountOn(user.uid)
            this.props.navigation.dispatch(NavigationActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'Home'})
                ]
            }))
        } else {
            this.props.accountOff()
            this.props.navigation.dispatch(NavigationActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'Login'})
                ],
                key:null
            }))
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Preload</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

const mapStateToProps = state => {
    return {
        status: state.auth.status
    }
}

export default connect(mapStateToProps, { accountOff, accountOn })(Preload)