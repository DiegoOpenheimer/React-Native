import {
    StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1.5
    },
    containerInputs: {
        flex: 2,
        paddingTop: 16,
        paddingBottom: 16,
    },
    scrollView: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    input: {
        padding: 10,
        backgroundColor: '#e5e5e5',
        fontSize: 20,
        borderRadius: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    containerInput: {
        marginBottom: 16,
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