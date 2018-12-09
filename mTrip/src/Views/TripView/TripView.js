import React, { Component } from 'react'
import { View, Text, FlaList, Image, TouchableWithoutFeedback, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import IconAdd from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import ItemTile from './components/ItemTile'

export default class TripView extends Component {

    state = {
        trip: { id: 0, name: '', price: '', places: new Array()},
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

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <View style={styles.groupBtn}>
                        <View style={styles.iconBackLeft}>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                                <Icon size={40} color="#FFF" name="arrowleft" />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.iconBackRight}>
                            <TouchableWithoutFeedback onPress={this.goViewNewPoint}>
                                <IconAdd size={40} color="#FFF" name="add" />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={styles.headerInformation}>
                        <Text style={styles.nameTrip}>{this.state.trip.name}</Text>
                        <View style={styles.cardPrice}><Text style={styles.price}>R$ {this.state.trip.price}</Text></View>
                    </View>
                </View>
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