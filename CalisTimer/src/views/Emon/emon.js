import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Title from '../../components/Title/Title'
import Icon from 'react-native-vector-icons/FontAwesome'
import Select from '../../components/Select/Select'

const Emon = props => {
    return(
        <View style={styles.container}>
            <Title styleContent={styles.styleContent} style={styles.title} stylesTitle={styles.title} stylesSubTitle={styles.subTitle} title='Emon' subTitle='Every Minute On The Minute' />
            <Icon style={styles.iconGear} name="gear" color="#FFF" size={70} />
            <Select onSelected={(value) => console.log(value)} label="Alertas" selected={0} options={['Desligado', '15s', '30s', '45s']} styleContent={styles.select} />
            <Select onSelected={(value) => console.log(value)} label="Contagem regressiva" selected={0} options={['Sim', 'Não']} styleContent={styles.select} />
            <Text>Quantos minutos</Text>
            <Text>15</Text>
            <View style={{flexDirection: 'row', flex:1, alignItems:'flex-end'}}>
                    <Text>Button</Text>
                    <Text>TESTAR</Text>
            </View>
           </View>
    )
}

Emon.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#d6304a',
        alignItems: 'stretch'
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
    }
})

export default Emon