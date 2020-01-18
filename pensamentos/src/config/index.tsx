import React from 'react'
import { Text, StyleSheet, Image, SafeAreaView, Switch, View, StatusBar } from 'react-native'
import Slider from '@react-native-community/slider'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import Color from '../shared/Color'
import Divider from '../shared/components/divider'
import {useSelector} from 'react-redux'
import {Config, useDispatchConfig} from '../context'

const ConfigComponent = () => {

    const state = useSelector((state: Config) => ({
        automatic: state.automatic,
        timeToChangeThoughts: state.timeToChangeThoughts,
        currentSegment: state.currentSegment,
        timeOnStorage: state.timeSaveOnStorage
    }))
    const dispatch = useDispatchConfig()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.spacingContent}>Mudar automaticamente</Text>
                <Switch
                    value={state.automatic}
                    onValueChange={dispatch.setAutomatic}
                    trackColor={{ false: Color.gray, true: Color.primaryColor }}
                    thumbColor={Color.white}
                    style={styles.spacingContent} />
                <Divider style={styles.spacingContent} />
                <Text style={styles.spacingContent}>Mudar após {Math.floor(state.timeToChangeThoughts)} segundos</Text>
                <View style={[styles.contentSlider, styles.spacingContent]}>
                    <Text>3</Text>
                    <Slider
                        onValueChange={value => dispatch.setTime(value, false)}
                        onSlidingComplete={value => dispatch.setTime(value, true)}
                        style={{flex: 1}}
                        minimumValue={3}
                        maximumValue={30}
                        value={state.timeOnStorage}
                        minimumTrackTintColor={Color.primaryColor}
                        thumbTintColor={Color.primaryColor}
                        maximumTrackTintColor={Color.gray}
                    />
                    <Text>30</Text>
                </View>
                <Divider style={styles.spacingContent} />
                <Text style={styles.spacingContent}>Esquema de cores</Text>
                <SegmentedControlTab 
                    values={['Claro', 'Escuro']}
                    selectedIndex={state.currentSegment}
                    onTabPress={dispatch.setSegment}
                    activeTabStyle={{backgroundColor: Color.primaryColor}}
                    tabStyle={{borderColor: Color.primaryColor}}
                    tabTextStyle={{color:Color.primaryColor}}
                    tabsContainerStyle={{marginHorizontal: 16}}
                />
            </View>
            <Text style={styles.textFooter}>Obs: Para mudar de pensamento basta tocar em qualquer lugar na tela "Pesanmentos"</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight
    },
    spacingContent: {
        marginTop: 8,
        marginBottom: 8,
    },

    contentSlider: {
        flexDirection: 'row',
        paddingHorizontal: 16
    },
    textFooter: {
        textAlign: 'center',
        margin: 8,
        color: Color.primaryColor,
        fontSize: 16,
        marginBottom: 16
    }
})

ConfigComponent.navigationOptions = {
   title: 'Configurações',
   tabBarIcon: (value: any) => {
       return <Image source={require('../assets/settings.png')} style={{
        tintColor: value.tintColor
       }} />
   }
}

export default ConfigComponent