import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    btnLeft: {
        marginTop: 24,
        marginLeft: 16
    },
    container: {
        flex: 1
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