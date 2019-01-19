import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../style'
import Timer from '../../components/Timer/Timer'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Title from '../../components/Title/Title'
import Icon from 'react-native-vector-icons/FontAwesome'
import BackgroundProgress from '../../components/BackgroundProgress/BackgroundProgress'
import Sound from 'react-native-sound'
import SoundAlert from '../../../assets/alert.wav'
import Square from 'react-native-vector-icons/FontAwesome'


export default class EmonRunning extends React.Component {

    state = {
        countDownTime: null,
        time: 15 * 60,
        countDown: 0,
        counterTimer: 0,
        timeCountDown: null,
        timer: null,
        fullTime: null,
        counterSeconds: 0,
        alertChoose: 'Desligado'
    }

    componentDidMount() {
        Sound.setCategory('Playback', true)
        this.alert = new Sound(SoundAlert)
        const time = this.props.params.time * 60
        this.setState({...this.props.params, time, fullTime: time})
        if(this.props.params.countDown) {
            this.alert.play()
            timeCountDown = setInterval(() => {
                this.setState({countDownTime: this.state.countDownTime - 1})
                this.alert.play()
                if (this.state.countDownTime === 0) {
                    clearInterval(timeCountDown)
                    this.setState({countDownTime: null})
                    this.startTimer(time)
                }
            }, this.props.params.test ? 100 : 1000)
            this.setState({timeCountDown})
        } else {
            this.startTimer(time)
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timeCountDown)
        clearInterval(this.state.timer)
    }

    stop = () => this.props.stop()

    startTimer = (paramsTime) => {
        let time = 0
        let fullTime = paramsTime
        const timer = setInterval(() => {
            time++
            fullTime--
            this.setState({counterTimer: time, time: fullTime, counterSeconds: this.state.counterSeconds + 1})
            if (this.state.counterSeconds === 60) {
                this.setState({counterSeconds: 0})
            }
            if (time === this.state.fullTime) {
                clearInterval(timer)
            }
            if(this.state.alertChoose !== 'Desligado' && time % parseInt(this.state.alertChoose.replace('s', '')) === 0) {
                this.alert.play()
            }
        }, this.props.params.test ? 100 : 1000);
        this.setState({timer})
    }

    render() {
        const fullTime = this.state.fullTime
        const counterTime = this.state.counterTimer
        return(
            <BackgroundProgress value={this.state.counterSeconds / 60 * 100} test={this.props.params.test}>
                <View style={styles.containerEmonRunning}>
                    <View style={{position:'absolute', top: 20}}>
                        <Title styleContent={styles.styleContent} style={styles.title} stylesTitle={styles.title} stylesSubTitle={styles.subTitle} title='Emon' />
                        <Icon style={styles.iconGear} name="gear" color="#FFF" size={70} />
                    </View>
                    <Timer styleText={styles.textTimer} time={this.state.counterTimer}/>
                    <ProgressBar value={counterTime / fullTime * 100} test={this.props.params.test} />
                    <Timer styleText={styles.textTimeRemmaing} time={this.state.time} appendText=' restantes'/>
                    <View style={styles.timerCountDown}>
                        {this.renderCountDown()}
                        <TouchableOpacity onPress={this.stop} activeOpacity={0.7} style={styles.buttonPlay}>
                            <Square name="square" color="#FFF" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
            </BackgroundProgress>
        )
    }

    renderCountDown = () => {
        if (this.state.countDownTime != null) {
            return <Text style={styles.textTimerCountDown}>{this.state.countDownTime }</Text>
        }
    }

}
