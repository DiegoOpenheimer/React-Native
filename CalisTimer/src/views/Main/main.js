import React from 'react'
import { View, Text, StatusBar } from 'react-native'

import Button from '../../components/Button/Button'
import styles from './styles'

export default class Main extends React.PureComponent {

    render() {
        return(
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,.3)'} />
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>CalisTimer</Text>
                </View>
                <View style={styles.containerButtons}>
                    <Button onPress={() => this.props.navigation.navigate('Emon')} styleText={styles.textButton} >EMON</Button>
                    <Button styleText={styles.textButton} >AMRAP</Button>
                    <Button styleText={styles.textButton} >ISOMETRIA</Button>
                </View>
            </View>
        )
    }
    
}
