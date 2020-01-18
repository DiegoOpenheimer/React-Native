import React, { useRef, useEffect, useMemo } from 'react'
import { TouchableWithoutFeedback, View,StyleSheet, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { Config, useDispatchConfig } from '../context'
import QuoteComponent, { QuoteRef } from './components/quote'
import Color from '../shared/Color'

let timer: number

const Thoughts = () => {

    const state = useSelector((state: Config) => state)
    const config = useDispatchConfig()
    const quoteComponent = useRef<QuoteRef>()

    const configDispatch = useDispatchConfig()

    useEffect(() => {
      configDispatch.load()
    }, [])

    useEffect(() => {
        startThoughts()
    }, [state.automatic, state.currentSegment, state.timeToChangeThoughts])

    function startThoughts() {
        clearTimeout(timer)
        if (state.automatic) {
            timer = setTimeout(startThoughts, state.timeToChangeThoughts * 1000)
        }
        quoteComponent.current?.resetAnimation()
        config.changeQuote()
    }

    const colors = useMemo(() => {
        const isLight = state.currentSegment === 0;
        return {
            color: isLight ? Color.whiteWithOpactiy(.4) : Color.primaryColorWithOpactiy(.5),
            textColor: isLight ? Color.black : Color.white
        }
    }, [state.currentSegment])

    return (
        <TouchableWithoutFeedback onPress={startThoughts} style={styles.container} >
            <View>
                <Image source={state.quote?.image} blurRadius={10} resizeMode='cover' />
                <QuoteComponent ref={quoteComponent} color={colors.color} textColor={colors.textColor} quote={state.quote} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

Thoughts.navigationOptions = {
    title: 'Pensamentos',
    tabBarIcon: (value: any) => {
        return <Image source={require('../assets/quotes.png')} style={{
            tintColor: value.tintColor
        }} />
    }
 }
 

export default Thoughts