import React from 'react'
import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native'
import Title from '../../components/Title/Title'
import Icon from 'react-native-vector-icons/FontAwesome'
import ArrowLeft from 'react-native-vector-icons/AntDesign'
import Select from '../../components/Select/Select'
import styles from '../style'
import AmrapRunning from './amrapRunning'

const TIME_COUNT_DOWN = 5

class Amrap extends React.Component {

    static navigationOptions = {
        header: null
    }

    handlerBackButton = () => {
        if (this.state.step) {
            this.setState({step: 0})
        } else {
            this.props.navigation.pop()
        }
        return true
    }

    state = {
        step: 0,
        countDownTime: TIME_COUNT_DOWN,
        countDown: 0,
        time: 15,
        alertOptions: ['Desligado', '15s', '30s', '45s'],
        alertChoose: 'Desligado',
        test: false,
        counterTimer: 0
    }

    start = (test) => {
        const time = this.state.time || 15
        const countDownTime = this.state.countDown ? TIME_COUNT_DOWN : null
        this.setState({step: 1, time: time, countDownTime, test})
    }

    goBack = () => this.setState({step: 0})

    render() {
        if (this.state.step) {
            return <AmrapRunning params={this.state} goBack={this.goBack}/>
        } else {
            return(
                <TouchableWithoutFeedback onPress={() => this.input.blur()}>
                    <View style={styles.container}>
                        <Title styleContent={styles.styleContent} style={styles.title} stylesTitle={styles.title} stylesSubTitle={styles.subTitle} title='Amrap' />
                        <Icon style={styles.iconGear} name="gear" color="#FFF" size={70} />
                        <Select onSelected={(index) => this.setState({alertChoose: this.state.alertOptions[index]})} label="Alertas" selected={0} options={this.state.alertOptions} styleContent={styles.select} />
                        <Select onSelected={(value) => this.setState({countDown: value})} label="Contagem regressiva" selected={this.state.countDown} options={['Não', 'Sim']} styleContent={styles.select} />
                        <View style={styles.chooseMinutes}>
                            <Text style={styles.textMinutes}>Quantos minutos</Text>
                            <TextInput onChangeText={time => this.setState({time})} ref={r => this.input = r} selectionColor="#FFF" defaultValue={this.state.time.toString()} keyboardType="numeric" maxLength={4} style={styles.input} />
                        </View>
                        <View style={styles.bottom}>
                                <TouchableOpacity onPress={() => this.start(false)} activeOpacity={0.7} style={styles.buttonPlay}>
                                    <ArrowLeft name="caretright" color="#FFF" size={30} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.start(true)} style={styles.buttonTest}>
                                    <Text style={styles.buttonTestText}>TESTAR</Text>
                                </TouchableOpacity>
                        </View>
                   </View>
                </TouchableWithoutFeedback>
            )
        }
    }

}
export default Amrap