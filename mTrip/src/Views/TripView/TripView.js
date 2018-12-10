import React, { Component } from 'react'
import { View, Text, FlaList, Image, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-crop-picker'
import { connect } from 'react-redux'

import styles from './styles'
import ItemTile from './components/ItemTile'
import BACKGROUND_CARD from '../../../assets/background.png'
import { editTrip } from '../../actions/trips'

class TripView extends Component {

    state = {
        trip: { id: 0, name: '', price: '', places: new Array(), img: ''},
    }

    componentDidMount() {
        const trip = this.props.navigation.getParam('trip')
        this.setState({trip})
    }

    refresh = (trip) => {
        const s = {...this.state}
        s.trip = trip
        this.setState(s) 
    }

    goViewNewPoint = () => this.props.navigation.navigate('NewPoint', { idTrip: this.state.trip.id, refresh: this.refresh })

    checkImg = () => {
        const { img } = this.state.trip
        if(img) {
            return { uri: img }
        }
        return BACKGROUND_CARD
    }

    handlerImagePicker = async () => {
        const result = await ImagePicker.openPicker({mediaType: 'photo'})
        if(result && result.path) {
            const { trip } = {...this.state}
            trip.img = result.path
            this.setState({trip})
            this.props.editTrip(this.props.trips, trip)
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <ImageBackground source={this.checkImg()} style={styles.containerImg}>
                    <View style={styles.groupBtn}>
                        <View style={styles.iconBackLeft}>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                                <Icon size={40} color="#FFF" name="arrowleft" />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.iconBackRight}>
                            <TouchableWithoutFeedback onPress={this.goViewNewPoint}>
                                <IconMaterialIcons size={40} color="#FFF" name="add" />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={styles.contentBtnImg}>
                        <TouchableOpacity onPress={this.handlerImagePicker} activeOpacity={0.9}>
                            <IconMaterialIcons name="add-a-photo" size={40} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerInformation}>
                        <Text style={styles.nameTrip}>{this.state.trip.name}</Text>
                        <View style={styles.cardPrice}><Text style={styles.price}>R$ {this.state.trip.price}</Text></View>
                    </View>
                </ImageBackground>
                <FlatList 
                    extraData={this.state}
                    data={this.state.trip.places}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <ItemTile place={item} />}
                />
            </View>
        )
    }

}

const mapStateToProps = state => ({ trips: state.handlerTrips.trips })

export default connect(mapStateToProps, { editTrip })(TripView)