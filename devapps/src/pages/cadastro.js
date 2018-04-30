import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { createAccount, loadEmail, loadName } from "../actions/auth";

export class Cadastro extends Component {

    static navigationOptions = {
        title:'Cadastrar',
       }

    constructor(props) {
        super(props)
        this.state = {
            password:''
        }
     }

     componentDidUpdate() {
        if(this.props.status) {
            this.props.navigation.dispatch(NavigationActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'Home'})
                ]
            }))
        }
     }
    cadastrar() {
        this.refs.email.clear()
        this.refs.name.clear()
        this.setState({password:''})
        this.props.createAccount(this.props.email, this.state.password, this.props.name)
    }

    render() {
        return(
            <View style={styles.container}>
                <Spinner animation={'fade'} cancelable={true} color={'#FFF'} visible={this.props.loading} />
                <View style={styles.inputs}>
                    <Text style={styles.title}>Cadastrar</Text>
                    <TextInput ref={"name"} onChangeText={name=>this.props.loadName(name)} maxLength={30} selectionColor={'#fff'} placeholder="Informe nome" placeholderTextColor="#fff" style={styles.input} underlineColorAndroid="transparent" />
                    <TextInput ref={"email"} onChangeText={email=>this.props.loadEmail(email)} maxLength={30} placeholder="Informe email" selectionColor={'#fff'} placeholderTextColor={"#FFF"} style={styles.input} underlineColorAndroid="transparent"/>
                    <TextInput value={this.state.password} onChangeText={password=>this.setState({password})} maxLength={15} secureTextEntry={true} selectionColor={'#fff'} placeholder="Informe senha" placeholderTextColor="#fff" style={styles.input} underlineColorAndroid="transparent" />
                    <View style={styles.btn}>
                        <Button onPress={this.cadastrar.bind(this)} title={"cadastrar"} />
                    </View>
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
    },
    title: {
        textAlign:'center',
        fontSize:30,
        fontWeight:'500'
    },
    inputs: {
        width:'80%'
    },
    input: {
        backgroundColor:'rgba(0,0,0,.5)',
        color:'#fff',
        borderRadius: 30,
        margin:5,
        padding:10
    },
    btn: {
        width: '50%',
        alignSelf:'center'
    }
})

const mapStateToProps = state => {
    return {
        status:state.auth.status,
        loading:state.auth.loading,
        name:state.auth.name,
        email:state.auth.email,

    }
}

export default connect(mapStateToProps, { createAccount, loadEmail, loadName })(Cadastro)

