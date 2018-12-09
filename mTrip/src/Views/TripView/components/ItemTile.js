import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const numberOfLines = {
    ellipsizeMode: 'tail',
    numberOfLines: 1
}

const ItemTile = props => {
    const { place } = props
    return(
        <View style={styles.container}>
            <View style={styles.information}>
                <Text {...numberOfLines } style={styles.placeName}>{place.name}</Text>
                <Text {...numberOfLines} style={styles.description}>{place.description}</Text>
            </View>
            <Text {...numberOfLines} style={styles.price}>R$ {place.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dedede'
    },
    placeName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 16,
    },
    price: {
        fontSize: 16,
        color: '#45b4f9'
    },
    information: {
        flex:1,
        marginRight: 10
    }
})

export default ItemTile