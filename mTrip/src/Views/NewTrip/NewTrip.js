import React, { Component } from 'react'
import { View, Text, Button, TextInput, ImageBackground, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import IconCamera from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast'
import ImagePicker from 'react-native-image-crop-picker'

import BACKGROUND_HEADER from '../../../assets/background.png'
import styles from './styles'
import { addTrips } from '../../actions/trips'

const checkImg = uri => {
    if(uri) {
        return { uri }
    } else {
        return BACKGROUND_HEADER
    }
}

const positionIconCamera = value => {
    if(value) {
        return styles.btnRight
    }
    return null
}

const mountHeader = navigation => () => {
    const img = navigation.getParam('img')
    const callback = navigation.getParam('handlerPickerImage')
    return <View style={styles.heightHeader}>
        <ImageBackground style={styles.contentHeader} source={ checkImg(img)} resizeMode="cover">
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View style={styles.btnLeft}>
                    <Icon size={40} color="#FFF" name="arrowleft" />
                </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity style={positionIconCamera(img)} onPress={() => callback()} activeOpacity={0.9} >
                <IconCamera name="add-a-photo" size={!!img ? 40 : 80} color="#FFF" />
            </TouchableOpacity>
        </ImageBackground>
    </View>
}

class NewTrip extends Component {

    componentDidMount() {
        this.props.navigation.setParams({handlerPickerImage: this.handlerPickerImage})
    }

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

    handlerPickerImage = () => {
        ImagePicker.openPicker({
            mediaType: 'photo'
        })
        .then(result => {
            if(result && result.path) {
                const s = {...this.state}
                s.trip.img = result.path
                this.props.navigation.setParams({img: result.path})
                this.setState(s)
            }
        })
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