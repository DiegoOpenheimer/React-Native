import React from 'react'
import { View, Text, TouchableOpacity, BackHandler } from 'react-native'
import styles from '../style'
import Timer from '../../components/Timer/Timer'
import Title from '../../components/Title/Title'
import Icon from 'react-native-vector-icons/FontAwesome'
import BackgroundProgress from '../../components/BackgroundProgress/BackgroundProgress'
import Sound from 'react-native-sound'
import SoundAlert from '../../../assets/alert.wav'
import Square from 'react-native-vector-icons/FontAwesome'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import KeepAwake from 'react-native-keep-awake'



export default class IsometriaRunning extends React.Component {

    state = {
        countDownTime: 5,
        time: 20,
        counterTimer: 0,
        timeCountDown: null,
        timer: null,
        fullTime: null,
        alertChoose: 'Livre',
        pause: false
    }

    componentDidMount() {
        Sound.setCategory('Playback', true)
        this.alert = new Sound(SoundAlert)
        const time = this.props.params.time
        this.setState({...this.props.params, time, fullTime: time})
        this.initialize()
        BackHandler.addEventListener('hardwareBackPress', this.goBack)
    }

    componentWillUnmount() {
        clearInterval(this.state.timeCountDown)
        clearInterval(this.state.timer)
        BackHandler.removeEventListener('hardwareBackPress', this.goBack)
    }

    initialize = () => {
        this.alert.play()
        if (this.state.countDownTime) {
            timeCountDown = setInterval(() => {
                this.setState({countDownTime: this.state.countDownTime > 0 ? this.state.countDownTime - 1 : 0})
                this.alert.play()
                if (this.state.countDownTime === 0) {
                    clearInterval(timeCountDown)
                    this.setState({countDownTime: null})
                    this.startTimer()
                }
            }, this.props.params.test ? 100 : 1000)
            this.setState({timeCountDown})
        } else {
            this.startTimer()
        }
    }

    stop = () => {
        this.setState({pause: !this.state.pause})
        if (this.state.pause) {
            this.initialize()
        } else {
            clearInterval(this.state.timeCountDown)
            clearInterval(this.state.timer)
        }
    }

    startTimer = () => {
        const timer = setInterval(() => {
            this.setState({counterTimer: this.state.counterTimer + 1, time: this.state.time > 0 ? this.state.time - 1 : 0})
              if (this.state.counterTimer.toString() === this.state.fullTime.toString()) {
                this.alert.play()
            }
        }, this.props.params.test ? 100 : 1000);
        this.setState({timer})
    }

    refresh = () => {
        if (this.state.pause) {
            this.setState({...this.props.params})
        }
    }

    goBack = () => {
        if (this.state.pause) {
            this.props.goBack()
        }
        return true
    }

    render() {
        const fullTime = this.state.fullTime
        const counterTime = this.state.counterTimer
        const opacity = this.state.pause ? 1 : 0.5
        return(
            <BackgroundProgress value={this.state.alertChoose !== 'Livre' ? counterTime / fullTime * 100 : 100} test={this.props.params.test}>
            <KeepAwake />
                <View style={styles.containerEmonRunning}>
                    <View style={{position:'absolute', top: 20}}>
                        <Title styleContent={styles.styleContent} style={styles.title} stylesTitle={styles.title} stylesSubTitle={styles.subTitle} title='Isometria' />
                        <Icon style={styles.iconGear} name="gear" color="#FFF" size={70} />
                    </View>
                    <Timer styleText={styles.textTimer} time={this.state.counterTimer}/>
                    {
                        this.buildInformation()
                    }
                    <View style={[styles.timerCountDown, { alignItems: 'center' }]}>
                        <Text style={styles.textTimerCountDown}>{this.state.countDownTime }</Text>
                        <View style={styles.buttonsBottomBackReset}>
                            <TouchableOpacity onPress={this.goBack} activeOpacity={0.7}>
                                <IconAntDesign style={{opacity}} name="arrowleft" color="#FFF" size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.stop} activeOpacity={0.7} style={styles.buttonPlay}>
                                {
                                    this.state.pause ? <IconAntDesign name="caretright" color="#FFF" size={30} /> : <Square name="square" color="#FFF" size={30} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.refresh} activeOpacity={0.7}>
                                <IconFontAwesome style={{opacity}} name="refresh" color="#FFF" size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BackgroundProgress>
        )
    }

    buildInformation = () => {
        let message
        if (this.state.alertChoose !== 'Livre') {
            if(this.state.pause && this.state.counterTimer > this.state.fullTime) {
                message = (this.state.fullTime - this.state.counterTimer).toString().concat(' segundos')
            }
            return <React.Fragment>
                <Timer styleText={styles.textTimeRemmaing} time={this.state.time} appendText=' restantes'/>
                <Text style={styles.textTimeRemmaing}>{message}</Text>
            </React.Fragment>
        }
    }
}
