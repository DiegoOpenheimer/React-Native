import React from 'react'
import { View, Text, TouchableOpacity, BackHandler } from 'react-native'
import styles from '../style'
import Timer from '../../components/Timer/Timer'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Title from '../../components/Title/Title'
import Icon from 'react-native-vector-icons/FontAwesome'
import BackgroundProgress from '../../components/BackgroundProgress/BackgroundProgress'
import Sound from 'react-native-sound'
import SoundAlert from '../../../assets/alert.wav'
import Square from 'react-native-vector-icons/FontAwesome'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import KeepAwake from 'react-native-keep-awake';


export default class AmrapRunning extends React.Component {

    state = {
        countDownTime: null,
        time: 15 * 60,
        countDown: 0,
        counterTimer: 0,
        timeCountDown: null,
        timer: null,
        fullTime: null,
        counterSeconds: 0,
        alertChoose: 'Desligado',
        pause: false,
        count: 0
    }

    componentDidMount() {
        Sound.setCategory('Playback', true)
        this.alert = new Sound(SoundAlert)
        const time = this.props.params.time * 60
        this.setState({...this.props.params, time, fullTime: time}, () => {
            this.initialize()
        })
        BackHandler.addEventListener('hardwareBackPress', this.goBack)
    }

    initialize = () => {
        if(this.props.params.countDown) {
            this.alert.play()
            timeCountDown = setInterval(() => {
                if (!this.state.pause) {
                    this.setState({countDownTime: this.state.countDownTime - 1})
                    this.alert.play()
                    if (this.state.countDownTime === 0) {
                        clearInterval(timeCountDown)
                        this.setState({countDownTime: null})
                        this.startTimer()
                    }
                }
            }, this.props.params.test ? 100 : 1000)
            this.setState({timeCountDown})
        } else {
            this.startTimer()
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timeCountDown)
        clearInterval(this.state.timer)
        BackHandler.removeEventListener('hardwareBackPress', this.goBack)
    }

    goBack = () => {
        if (this.state.pause) {
            this.props.goBack()
        }
        return true
    }

    stop = () => this.props.stop()

    pause = () => {
        this.setState({pause: !this.state.pause})
    }

    refresh = () => {
        if(this.state.pause) {
            const time = this.props.params.time * 60
            if (this.state.counterTimer === this.state.fullTime) {
                this.setState({...this.props.params, counterSeconds: 0, time, fullTime: time, count: 0}, () => this.initialize())
            } else {
                this.setState({...this.props.params, counterSeconds: 0, time, fullTime: time, count: 0}, () => {
                    if(this.props.params.countDown) {
                        clearInterval(this.state.timer)
                        clearInterval(this.state.timeCountDown)
                        this.initialize()
                    }
                })
            }
        }
    }

    startTimer = () => {
        const timer = setInterval(() => {
            if(!this.state.pause) {
                this.setState({counterTimer: this.state.counterTimer + 1, time: this.state.time - 1, counterSeconds: this.state.counterSeconds + 1})
                if (this.state.counterSeconds === 60) {
                    this.setState({counterSeconds: 0})
                }
                if (this.state.counterTimer === this.state.fullTime) {
                    this.setState({pause: true})
                    clearInterval(timer)
                }
                if(this.state.alertChoose !== 'Desligado' && this.state.counterTimer % parseInt(this.state.alertChoose.replace('s', '')) === 0) {
                    this.alert.play()
                }
            }
        }, this.props.params.test ? 100 : 1000);
        this.setState({timer})
    }

    render() {
        const fullTime = this.state.fullTime
        const counterTime = this.state.counterTimer
        const opacity = this.state.pause ? 1 : 0.5
        const media = this.state.count > 0 ? counterTime / this.state.count : 0
        const estimated = media > 0 ? Math.floor(this.state.fullTime / media) : 0
        return(
            <BackgroundProgress value={this.state.counterSeconds / 60 * 100} test={this.props.params.test}>
                <KeepAwake />
                <View style={styles.containerEmonRunning}>
                    <View style={{position:'absolute', top: 20}}>
                        <Title styleContent={styles.styleContent} style={styles.title} stylesTitle={styles.title} stylesSubTitle={styles.subTitle} title='Amrap' />
                        <Icon style={styles.iconGear} name="gear" color="#FFF" size={70} />
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Timer styleText={styles.textTimeRemmaing} time={media} />
                            <Text style={styles.textTimeRemmaing}>Por repetição</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={styles.textTimeRemmaing}>{estimated}</Text>
                            <Text style={styles.textTimeRemmaing}>repetições</Text>
                        </View>
                    </View>
                    <Timer styleText={styles.textTimer} time={this.state.counterTimer}/>
                    <ProgressBar value={counterTime / fullTime * 100} test={this.props.params.test} />
                    <Timer styleText={styles.textTimeRemmaing} time={this.state.time} appendText=' restantes'/>
                    <View style={styles.timerCountDown}>
                        {this.renderCountDown()}
                        <View style={styles.buttonsBottomBackReset}>
                            <TouchableOpacity onPress={this.goBack} activeOpacity={0.7}>
                                <IconAntDesign style={{opacity}} name="arrowleft" color="#FFF" size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.pause} activeOpacity={0.7} style={styles.buttonPlay}>
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

    renderCountDown = () => {
        if (this.state.countDownTime != null) {
            return <Text style={styles.textTimerCountDown}>{this.state.countDownTime }</Text>
        } else {
            return (
                <View style={styles.buttonsAmrap}>
                    <TouchableOpacity onPress={() => this.setState({count: this.state.count - 1 > 0 ? this.state.count - 1 : 0})}>
                        <IconAntDesign color="#FFF" size={80} name="minus" />
                    </TouchableOpacity>
                    <Text style={styles.textTimer}>{this.state.count}</Text>
                    <TouchableOpacity onPress={() => this.setState({count: this.state.count + 1})}>
                        <IconAntDesign color="#FFF" size={80} name="plus" />   
                    </TouchableOpacity>
                </View>
            )
        }
    }

}
