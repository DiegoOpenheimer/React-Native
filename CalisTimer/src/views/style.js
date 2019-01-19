import {
    StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d6304a',
        alignItems: 'stretch'
    },
    containerEmonRunning: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentIsometria: {
        justifyContent: 'center',
        flex: 4
    },
    title: {
        color: '#FFF',
        fontFamily: 'Ubuntu-Bold',
        fontSize: 48
    },
    subTitle: {
        color: '#FFF'
    },
    styleContent: {
        marginTop: 50,
        marginBottom: 10
    },
    iconGear: {
        alignSelf: 'center'
    },
    select: {
        marginTop: 20
    },
    bottom: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    buttonPlay: {
        backgroundColor: 'rgba(255, 255, 255, .3)',
        height: 70,
        width: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    buttonTest: {
        position: 'absolute',
        right: 16,
        bottom: 35
    },
    buttonTestText: {
        fontSize: 24,
        color: '#FFF'
    },
    chooseMinutes: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    textMinutes: {
        color: '#FFF',
        fontSize: 24,
        padding: 0,
        margin: 0
    },
    input: {
        color: '#FFF',
        fontSize: 96,
        padding: 0,
        margin: 0
    },
    textTimer: {
        color: '#FFF',
        fontFamily: 'Ubuntu-Bold',
        fontSize: 96
    },
    textTimeRemmaing: {
        color: '#FFF',
        fontSize: 20
    },
    timerCountDown: {
        position: 'absolute',
        bottom: 20
    },
    textTimerCountDown: {
        color: '#FFF',
        fontFamily: 'Ubuntu-Bold',
        fontSize: 120
    }
})

export default styles