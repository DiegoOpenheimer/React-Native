import React, { useRef, useEffect, useMemo } from 'react'
import { TouchableWithoutFeedback, View,StyleSheet, Image, ImageBackground, Dimensions } from 'react-native'
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
        <ImageBackground style={styles.image} source={state.quote?.image} blurRadius={10}>
            <TouchableWithoutFeedback onPress={startThoughts} >
                <View style={styles.container} >
                    <QuoteComponent ref={quoteComponent} color={colors.color} textColor={colors.textColor} quote={state.quote} />
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        resizeMode: 'cover',
        flex: 1
    }
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