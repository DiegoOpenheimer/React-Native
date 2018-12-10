import {
    StyleSheet,
    Dimensions
} from 'react-native'

const dim = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card: {
        width: dim.width - 32,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardPrice: {
        position: 'absolute',
        bottom: 5,
        right: 10,
        backgroundColor: '#45b4f9',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    nameTrip: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold'
    },
    price: {
        color: '#FFF',
        fontSize: 18
    },
    logo: {
        width: 150,
        height: 150
    }
})

export default styles