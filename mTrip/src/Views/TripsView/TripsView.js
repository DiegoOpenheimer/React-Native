import React, { Component } from 'react'
import { View, FlatList, StatusBar, TouchableNativeFeedback, ToastAndroid } from 'react-native'
import MapView from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import styles from './styles'
import CardTrip from './components/CardTrip'
import { deleteTrip } from '../../actions/trips'

class TripsView extends Component {

    detailTrip = (trip) => this.props.navigation.navigate('Trip', { trip })

    newTrip = () => this.props.navigation.navigate('NewTrip')

    removeTrip = (trip) => {
        this.props.deleteTrip(this.props.trips, trip)
        if(this.props.trips.length) {
            this.list.scrollToIndex({
                animated: 'true',
                index: 0
            })
        }
    }

    initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }


    handlerScroll = info => {
        const { viewableItems } = info
        const [ data ] = viewableItems
        if (data.item.places.length) {
            const { latitude, longitude } = data.item.places[0]
            this.map.animateToRegion(
                this.regionFrom(latitude, longitude, 10000),
                1000
            )
        }
    }

    regionFrom = (lat, lon, distance) => {
        distance = distance/2
        const circumference = 40075
        const oneDegreeOfLatitudeInMeters = 111.32 * 1000
        const angularDistance = distance/circumference

        const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
        const longitudeDelta = Math.abs(Math.atan2(
                Math.sin(angularDistance)*Math.cos(lat),
                Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

        return result = {
            latitude: lat,
            longitude: lon,
            latitudeDelta,
            longitudeDelta,
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,.2)'} />
                <View style={styles.boxMap}>
                    <MapView ref={map => this.map = map} initialRegion={this.initialRegion} style={styles.map}></MapView>
                    <TouchableNativeFeedback onPress={this.newTrip}>
                        <View style={styles.positionBtnMap}>
                            <Icon name="add" color="#FFF" size={50}></Icon>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                {
                    this.props.trips.length > 0 &&
                    <View style={styles.contentTrips}>
                        <FlatList
                            onViewableItemsChanged={this.handlerScroll}
                            ref={ref => this.list = ref}
                            pagingEnabled
                            horizontal
                            style={{flex:1}}
                            data={this.props.trips}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item}) => <CardTrip onLongPres={this.removeTrip} onPress={this.detailTrip} trip={item} />}
                        />
                    </View>
                }
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        trips: state.handlerTrips.trips
    }
}

export default connect(mapStateToProps, { deleteTrip })(TripsView)