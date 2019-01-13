import React from 'react'
import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native'
import Title from '../../components/Title/Title'
import Icon from 'react-native-vector-icons/FontAwesome'
import ArrowLeft from 'react-native-vector-icons/AntDesign'
import Select from '../../components/Select/Select'
import styles from './style'

const Emon = props => {
    return(
        <TouchableWithoutFeedback onPress={() => this.input.blur()}>
            <View style={styles.container}>
                <Title styleContent={styles.styleContent} style={styles.title} stylesTitle={styles.title} stylesSubTitle={styles.subTitle} title='Emon' subTitle='Every Minute On The Minute' />
                <Icon style={styles.iconGear} name="gear" color="#FFF" size={70} />
                <Select onSelected={(value) => console.log(value)} label="Alertas" selected={0} options={['Desligado', '15s', '30s', '45s']} styleContent={styles.select} />
                <Select onSelected={(value) => console.log(value)} label="Contagem regressiva" selected={0} options={['Sim', 'Não']} styleContent={styles.select} />
                <View style={styles.chooseMinutes}>
                    <Text style={styles.textMinutes}>Quantos minutos</Text>
                    <TextInput ref={r => this.input = r} selectionColor="#FFF" defaultValue="15" keyboardType="numeric" maxLength={4} style={styles.input} />
                </View>
                <View style={styles.bottom}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.buttonPlay}>
                            <ArrowLeft name="caretright" color="#FFF" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonTest}>
                            <Text style={styles.buttonTestText}>TESTAR</Text>
                        </TouchableOpacity>
                </View>
           </View>
        </TouchableWithoutFeedback>
    )
}

Emon.navigationOptions = {
    header: null
}

export default Emon