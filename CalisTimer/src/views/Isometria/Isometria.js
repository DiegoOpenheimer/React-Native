import React from 'react'
import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native'
import Title from '../../components/Title/Title'
import ArrowLeft from 'react-native-vector-icons/AntDesign'
import Select from '../../components/Select/Select'
import styles from '../style'
import IsometriaRunning from './IsometriaRunning'

const TIME_COUNT_DOWN = 5

class Emon extends React.Component {

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
        time: 20,
        alertOptions: ['Livre', 'Bater tempo'],
        alertChoose: 'Livre',
        test: false,
        counterTimer: 0
    }

    start = (test) => {
        const time = this.state.time || 20
        this.setState({step: 1, time: time, test})
    }

    render() {
        if (this.state.step) {
            return <IsometriaRunning params={this.state} goBack={() => this.setState({step: 0})} />
        } else {
            return(
                <TouchableWithoutFeedback onPress={() => this.input.blur()}>
                    <View style={styles.container}>
                        <View style={styles.contentIsometria}>
                            <Title styleContent={styles.styleContent} style={styles.title} stylesTitle={styles.title} stylesSubTitle={styles.subTitle} title='Isometria' />
                            <Select onSelected={(index) => this.setState({alertChoose: this.state.alertOptions[index]})} label="Objetivos" selected={0} options={this.state.alertOptions} styleContent={styles.select} />
                            <View style={styles.chooseMinutes}>
                                <Text style={styles.textMinutes}>Quantos Segundos</Text>
                                <TextInput onChangeText={time => this.setState({time})} ref={r => this.input = r} selectionColor="#FFF" defaultValue={this.state.time.toString()} keyboardType="numeric" maxLength={4} style={styles.input} />
                            </View>
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
export default Emon