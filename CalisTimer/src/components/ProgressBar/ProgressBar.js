import React from 'react'
import { View, StyleSheet, Text, Animated, Easing } from 'react-native'

class ProgressBar extends React.Component {

    constructor(props) {
        super(props)
        this.width = new Animated.Value(0)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            Animated.timing(
                this.width,
                {
                    toValue: parseInt(this.props.value),
                    duration: 1000,
                    easing: Easing.easeInCirc
                }
            ).start()
        }
    }

    render() {
        const w = this.width.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%']
        })
        return (
            <Animated.View style={[styles.content, { width: w }]}></Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#FFF',
        height: 3,
        width: '100%',
        alignSelf: 'stretch',
    }
})

export default ProgressBar