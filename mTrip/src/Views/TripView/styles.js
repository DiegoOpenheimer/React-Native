import {
    StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerImg: {
        height: 200,
        backgroundColor: '#cecece',
        elevation: 4
    },
    groupBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconBackLeft: {
        width: 100,
        marginTop: 30,
        paddingLeft: 16,
        alignItems: 'flex-start'
    },
    iconBackRight: {
        width: 100,
        marginTop: 30,
        paddingRight: 16,
        alignItems: 'flex-end'
    },
    headerInformation: {
        flex: 1,
        flexDirection: 'row',
        margin: 16,
        justifyContent: 'space-between',
        alignItems: 'flex-end'
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
    cardPrice: {
        backgroundColor: '#45b4f9',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    }
})

export default styles