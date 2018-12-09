import React, { Component } from 'react'
import { View, Text, Button, TextInput, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast'

import BACKGROUND_HEADER from '../../../assets/background.png'
import styles from './styles'
import { addTrips } from '../../actions/trips'

const mountHeader = navigation => () => {
    return <View style={{height: 200}}>
        <ImageBackground style={{flex: 1}} source={BACKGROUND_HEADER} resizeMode="cover">
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View style={styles.btnLeft}>
                    <Icon size={40} color="#FFF" name="arrowleft" />
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    </View>
}

class NewTrip extends Component {

    state = {
        trip: {
            id: new Date().getTime(),
            name: '',
            price: 0,
            img: '',
            places: []
        },
        error: false
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Nova viagem',
        header: mountHeader(navigation)
    })

    handlerInput = txt => {
        const s = this.state
        s.trip.name = txt
        if (!(s.trip.name)) {
            s.error = true
        } else {
            s.error = false
        }
        this.setState(s)
    }

    saveNewTrip = () => {
        if (!(this.state.trip.name)) {
            this.setState({error: true})
        } else {
            this.props.addTrips(this.props.trips, this.state.trip)
            this.props.navigation.goBack()   
            Toast.show('Viagem cadastrada com sucesso', Toast.LONG)
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Nova Viagem</Text>
                <View style={styles.containerInputs}>
                    <TextInput onChangeText={this.handlerInput} maxLength={50} style={[styles.input, this.state.error ? styles.borderError : null]} placeholder="Nome da viagem" />
                    {
                        this.state.error === true &&
                        <Text style={styles.error}>Campo Obrigatório</Text>
                    }
                    <View style={styles.addMargin}>
                        <Button onPress={this.saveNewTrip} title="Salvar" />
                    </View>
                </View>
            </View>
        )
    }

}

const mapStateToProps = state => {
    return {
        trips: state.handlerTrips.trips
    }
}

export default connect(mapStateToProps, { addTrips })(NewTrip)