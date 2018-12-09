import React from 'react'
import { View, Text, TextInput, Button, ScrollView, Keyboard } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { connect } from 'react-redux'

import styles from './styles'
import { newPoint } from '../../actions/trips'

class NewPoint extends React.Component {

    initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        position: {
            longitude: -122.4324,
            latitute: 37.78825
        },
        point: {
            id: new Date().getTime(),
            name: '',
            description: '',
            price: 0,
            longitude: '',
            latitude: ''
        },
        error: {
            name: false,
            description: false,
            price: false
        }
    }

    componentDidMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            this.inputName.blur()
            this.inputDescription.blur()
            this.inputPrice.blur()
        });
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove()
    }

    handlerInput = type => txt => {
        const s = this.state
        s.point[type] = txt
        s.error[type] = false
        this.setState(s)
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView onRegionChangeComplete={region => this.setState({region})} initialRegion={this.initialRegion} region={this.state.region} style={styles.map}>
                    <Marker 
                        coordinate = {this.initialRegion}
                        draggable
                        title="Novo ponto"
                        description="Mova o marcador para definir um ponto a essa viagem"
                        onDragEnd={(e) => this.setState({position: e.nativeEvent.coordinate})}                        
                    />
                </MapView>
                <View style={styles.containerInputs}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.title}>Novo Ponto</Text>
                        <View style={styles.containerInput}>
                            <TextInput ref={ref => this.inputName = ref} onChangeText={this.handlerInput('name')} maxLength={80} style={[styles.input, this.state.error.name ? styles.borderError : null]} placeholder="Nome do ponto" />
                            { this.showMessageError(this.state.error.name) }
                        </View>
                        <View style={styles.containerInput}>
                            <TextInput ref={ref => this.inputDescription = ref} onChangeText={this.handlerInput('description')} maxLength={150} style={[styles.input, this.state.error.description ? styles.borderError : null]} placeholder="Descrição" />
                            { this.showMessageError(this.state.error.description) }   
                        </View>
                        <View style={styles.containerInput}>
                            <TextInput ref={ref => this.inputPrice = ref} maxLength={10} onChangeText={this.handlerInput('price')} keyboardType="decimal-pad" style={[styles.input, this.state.error.price ? styles.borderError : null]} placeholder="Preço" />
                            { this.showMessageError(this.state.error.price) }    
                        </View>
                        <Button title="Salvar" onPress={this.validateFields} />
                    </ScrollView>
                </View>
            </View>
        )
    }

    validateFields = () => {
        const {point, error, position} = this.state
        point.latitude = position.latitude
        point.longitude = position.longitude
        let save = true
        for(const i in point) {
            if(!point[i]) {
                error[i] = true
                save = false
            } else {
                error[i] = false
            }
        }
        this.setState({point, error})
        if(save) {
            this.props.newPoint(this.props.trips, this.props.navigation.getParam('idTrip'), point)
            this.props.navigation.state.params.refresh(this.props.trips.find(t => t.id === this.props.navigation.getParam('idTrip')))
            this.props.navigation.goBack()
        }
    }

    showMessageError = value => {
        if(value) {
            return <Text style={styles.error}>Campo Obrigatório</Text>
        }
        return null
    }

}

const mapStateToProps = state => {
    return {
        trips: state.handlerTrips.trips
    }
}

export default connect(mapStateToProps, { newPoint })(NewPoint)

