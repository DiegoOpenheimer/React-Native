import React from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'

class BackgroundProgress extends React.Component {

    constructor(props) {
        super(props)
        this.flexPrimary = new Animated.Value(0)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            Animated.timing(this.flexPrimary, {
                toValue: Math.floor(this.props.value),
                duration: this.props.test ? 100 : 1000,
                easing: Easing.easeInCirc
            }).start()
        }
    }

    render() {
        const { value } = this.props
        const handlerStyle = {
            height: this.flexPrimary.interpolate({inputRange:[0, 100], outputRange: ['100%', '0%']})
        }
        return(
            <View style={styles.container}>
                <Animated.View style={[styles.backgroundPrimary, handlerStyle]}></Animated.View>
                <View style={[styles.backgroundSecondary, styles.maxHeight]}></View>
                <View style={styles.content}>{this.props.children}</View>
            </View>
        )
    
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    backgroundPrimary: {
        backgroundColor: '#d6304a'
    },
    backgroundSecondary: {
        backgroundColor: '#2a0e12'
    },
    content: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    maxHeight: {
        height: '100%'
    }
})

export default BackgroundProgress