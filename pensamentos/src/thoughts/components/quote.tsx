import React, {useState, useEffect, forwardRef, useImperativeHandle, useMemo} from 'react';
import { View, StyleSheet, StatusBar, Text, Animated } from 'react-native';
import {Quote} from '../../context'

interface IQuoteComponent {
    quote: Quote,
    color: string,
    textColor: string,
}

export interface QuoteRef {
    resetAnimation: () => void
}

const QuoteComponent = forwardRef((props: IQuoteComponent, ref) => {

    const [fontSize, setFontSize] = useState(40)
    const [heightView, setHeightView] = useState()
    const [heightText, setHeightText] = useState()
    const [opacity] = useState(new Animated.Value(0))
    const [top] = useState(new Animated.Value(100))

    useImperativeHandle(ref, () => ({
        resetAnimation() {
            setFontSize(40)
            opacity.setValue(0)
            top.setValue(100)
        }
    }))

    useEffect(() => {
        Animated.parallel([
            Animated.timing(
                opacity,
                {
                    toValue: 1,
                    duration: 1500,
                }
            ),
            Animated.timing(
                top,
                {
                    toValue: 0,
                    duration: 1300,
                }
            )
        ]).start()
    }, [props.quote])

    useEffect(() => {
        if (heightText >= heightView) {
            setFontSize(fontSize - 1)
        }
    }, [heightText, heightView])

    const styles = useMemo(() => createStyle(props), [props.color])

    return (
        <View style={styles.container}>
            <Animated.Image style={{...styles.image, opacity}} source={props.quote.image} />
            <Animated.View style={{...styles.contentMessage, opacity, top}} onLayout={(e: any) => setHeightView(e.nativeEvent.layout.height)}>
                <Text adjustsFontSizeToFit onLayout={e => setHeightText(e.nativeEvent.layout.height)} style={[styles.message, {fontSize}]}>{props.quote.quote}</Text>
            </Animated.View>
            <Text style={styles.author}>{props.quote.author}</Text>
        </View>
    );
});

const createStyle = (props: IQuoteComponent) => StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: props.color,
        paddingTop: StatusBar.currentHeight
    },
    image: {
        aspectRatio: 750/666,
        width: '100%',
        height: undefined
    },
    message: {
        textAlign: 'center',
        color: props.textColor,
        paddingHorizontal: 16,
        fontFamily: 'AlexBrush-Regular'
    },
    contentMessage: {
        flex: 1
    },
    author: {
        textAlign: 'center',
        color: props.textColor,
        fontSize: 30,
        padding: 16,
        flex: .4,
        fontFamily: 'AlexBrush-Regular'
    },
});

export default QuoteComponent;
