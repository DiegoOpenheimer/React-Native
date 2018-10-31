import React from 'react'
import { View, Text, StyleSheet, StatusBar, Image, TouchableWithoutFeedback, Keyboard, ToastAndroid } from 'react-native'
import { ActionButton, Toolbar } from 'react-native-material-ui'
import { connect } from 'react-redux'
import PERSON from '../../images/person.png'
import { Sae } from 'react-native-textinput-effects'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-picker'
import { updateList } from '../actions/contacts'



class Information extends React.Component {

    componentDidMount() {
        const person = this.props.navigation.getParam('person')
        if (person && person.image) {
            this.setState({image: person.image})
        }
        if (person && person.id) {
            this.setState({id: person.id})
        } else {
            this.setState({id: new Date().getTime()})
        }
    }

    state = {
        image: null,
        name: null,
        email: null,
        phone: null,
        id: null
    }

    choseFile = () => {
        const options = {
            title: 'Selecione uma opção'
        }
        Image
        ImagePicker.showImagePicker(options, response => {
            if (response.error) return
            if (response.didCancel) return
            this.setState({image:{uri:response.uri}})
        })
    }

    buildImage = () => {
        if (this.state.image) {
            return (
                <TouchableWithoutFeedback onPress={this.choseFile}>
                    <Image source={this.state.image} style={{width: 150, height: 150, borderRadius: 75, marginTop: 10}} />
                </TouchableWithoutFeedback>
            )
        } else {
            return (
                <TouchableWithoutFeedback onPress={this.choseFile} >
                    <Image source={PERSON} style={{width: 150, height: 150, borderRadius: 75, marginTop: 10}} />
                </TouchableWithoutFeedback>
            )
        }
    }

    handlerInput = type => text => {
        this.setState({[type]: text})
    }

    buildInput = (label, typeKeyboard, type) => {
        return (
            <Sae
                label={label}
                iconClass={FontAwesomeIcon}
                iconName={'pencil'}
                iconColor={'#8080ff'}
                autoCapitalize={'none'}
                autoCorrect={false}
                labelStyle={{color:'#8080ff'}}
                style={{margin: 10}}
                inputStyle={{color: '#8080ff'}}
                keyboardType={typeKeyboard || 'default'}
                onChangeText={this.handlerInput(type)}
            />
        )
    }

    createContact = () => {
        const s = this.state
        for ( const i in s) {
            if (i !== 'image' && !s[i]) {
                ToastAndroid.show('Preencha todos os campos', 3000)
                return
            }
        }
        const list =[...this.props.contacts]
        list.push(s)
        this.props.updateList(list)
        this.props.navigation.pop()
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar translucent={true} backgroundColor="rgba(0,0,0,.3)" />
                <Toolbar
                    style={header}
                    centerElement="Contatos"
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.pop()}
                 />       
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={{alignItems: 'center'}}>
                            {this.buildImage()}
                        </View>
                        {this.buildInput('Nome', null, 'name')}
                        {this.buildInput('Email', 'email-address', 'email')}
                        {this.buildInput('Contato', 'phone-pad', 'phone')}
                        <ActionButton onPress={() => this.createContact()} />
                    </View>
                </TouchableWithoutFeedback>
            </React.Fragment>
        )
    }

}
const header = {
    container: {
        backgroundColor:'red',
        height:StatusBar.currentHeight+ 56,
        paddingTop: StatusBar.currentHeight
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor:'#FFF'
    }
})

const mapStateToProps = state => {
    return {
        contacts: state.contacts.allContacts
    }
}

export default connect(mapStateToProps, { updateList })(Information)