import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: '#d6304a'
    },
    title: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 48,
        color: '#FFF',
        marginTop: 100,
    },
    containerButtons: {
        flex: 1,
        justifyContent: 'space-around',
        paddingBottom: 40
    },
    containerTitle: {
        flex: 1
    },
    textButton: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center'
    }
})

export default style