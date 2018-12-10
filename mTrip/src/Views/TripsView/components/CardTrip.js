import React from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native'

import BACKGROUNDCARD from '../../../../assets/background.png'
import LOGO from '../../../../assets/Cópia-de-Tripplanner.png'
import styles from './styles'

const CardTrip = props => {
    const { trip, onPress, onLongPres } = props
    const imgExist = !!trip.img
    return (
        <View style={styles.container}>
            <TouchableOpacity onLongPress={() => handlerRemoveTrip(onLongPres, trip)} activeOpacity={0.9} onPress={() => onPress(trip)} style={styles.card}>
                <ImageBackground imageStyle={{borderRadius: 5}} activeOpacity={0.1} source={imgExist ? {uri: trip.img} : BACKGROUNDCARD} style={styles.card}>
                    { checkImg(imgExist, trip, onPress) }
                    <View style={styles.cardPrice}>
                        <Text style={styles.price}>R$ {trip.price.toFixed(2)}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <Text style={styles.nameTrip}>{trip.name}</Text>
        </View>
    )
}

function handlerRemoveTrip(callback, trip) {
    Alert.alert('Atenção', 'Deseja mesmo remover?', [
        {text: 'Não'},
        {text: 'Sim', onPress: () => callback(trip)},
    ], {
        cancelable: false
    })
}

function checkImg(exist, trip, callback) {
    if(exist) {
        return null
    } else {
        return (
            <Image source={LOGO} resizeMode="contain" style={styles.logo} />
        )
    }

}

export default CardTrip