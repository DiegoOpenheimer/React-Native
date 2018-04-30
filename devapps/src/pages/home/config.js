import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

export  class Config extends React.Component {
    static navigationOptions = {
        header:null,
        tabBarLabel:'Config.'
    }

    constructor(props) {
        super(props)
    }

    logout() {
        this.props.logout()
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Config</Text>
                <View style={{width:'100%', padding:10}}>
                    <Button title="Sair" onPress={this.logout.bind(this)} />
                </View>
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
    return { }
}

export default connect(mapStateToProps, { logout })(Config)