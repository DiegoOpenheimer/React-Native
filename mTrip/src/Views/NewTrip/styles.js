import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    btnLeft: {
        position: 'absolute',
        top: 24,
        left: 16
    },
    btnRight: {
        position: 'absolute',
        top: 24,
        right: 16
    },
    container: {
        flex: 1
    },
    heightHeader: {
        height: 200
    },
    contentHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerInputs: {
        flex: 1,
        alignItems: 'stretch',
        padding: 16,
    },
    input: {
        padding: 10,
        backgroundColor: '#e5e5e5',
        fontSize: 25,
        borderRadius: 15,
    },
    addMargin:{marginTop: 20},
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 20
    },
    error: {
        color: '#FF0000'
    },
    borderError: {
        borderColor: '#FF0000',
        borderWidth: 1
    }
})

export default styles