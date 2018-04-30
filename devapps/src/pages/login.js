import React from 'react'
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { NavigationActions } from 'react-navigation'
import { doLogin } from '../actions/auth'
import { connect } from 'react-redux'

export class Login extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }

    goCadastrar() {
        this.props.navigation.navigate('Cadastrar')
    }

    render() {
        return (
            <View style={styles.container}>
            <Spinner animation={'fade'} cancelable={true} color={'#FFF'} visible={this.props.loading} />
                <View style={styles.inputs}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput value={this.state.email} onChangeText={email=>this.setState({email})} maxLength={30} placeholder="Informe email" selectionColor={'#fff'} placeholderTextColor={"#FFF"} style={styles.input} underlineColorAndroid="transparent"/>
                    <TextInput value={this.state.password} onChangeText={password=>this.setState({password})} maxLength={15} secureTextEntry={true} selectionColor={'#fff'} placeholder="Informe senha" placeholderTextColor="#fff" style={styles.input} underlineColorAndroid="transparent" />
                   <View style={styles.buttons}>
                       <Button onPress={_=>{this.props.doLogin(this.state.email, this.state.password);this.setState({email:'', password:''})}} title={"Entrar"} />
                       <Button onPress={this.goCadastrar.bind(this)} title={"Cadastrar"} />
                   </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        width:'80%',
    },
    title: {
        fontSize:30,
        fontWeight:'500',
        textAlign:'center'
    },
    input: {
        backgroundColor:'rgba(0,0,0,.5)',
        color:'#fff',
        borderRadius: 30,
        margin:5,
        padding:10
    },
    buttons: {
        flexDirection:'row',
        justifyContent:'space-around'
    }

})

const mapStateToProps = state => {
    return {
        status:state.auth.status,
        loading:state.auth.loading
    }
}

export default connect(mapStateToProps, { doLogin })(Login)