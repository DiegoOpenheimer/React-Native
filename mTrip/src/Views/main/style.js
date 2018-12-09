import {
    StyleSheet
} from 'react-native'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50
    },
    imgTrip: {
        width: 200,
        height: 200
    },
    imgLOGO: {
        height: 50,
        width: '100%',
        marginBottom: 30
    },
    btnBottom: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    stepEmpty: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
    },
    stepEmptyText: {
        fontSize: 18,
        color: '#000',
        width: '50%',
        textAlign: 'center',
        marginTop: 10,
    },
    imgPin: {
        height: 90
    },
    btnArrow: {
        padding: 15,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles