import React from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'

class BackgroundProgress extends React.Component {

    constructor(props) {
        super(props)
        this.flexPrimary = new Animated.Value(0)
        this.flexSecondary = new Animated.Value(0)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            Animated.parallel([
                Animated.timing(this.flexPrimary, {
                    toValue: this.props.value,
                    duration: 1000,
                    easing: Easing.easeInCirc
                }),
                Animated.timing(this.flexSecondary, {
                    toValue: this.props.value,
                    duration: 1000,
                    easing: Easing.easeInCirc
                })
            ]).start()
        }
    }

    render() {
        const { value } = this.props
        const handlerStyle = {
            height: this.flexPrimary.interpolate({inputRange:[0, 100], outputRange: ['100%', '0%']})
        }
        const handlerStyleSecondary = {
            height: this.flexSecondary.interpolate({inputRange:[0, 100], outputRange: ['0%', '100%']})
        }
        return(
            <View style={styles.container}>
                <Animated.View style={[styles.backgroundPrimary, handlerStyle]}></Animated.View>
                <Animated.View style={[styles.backgroundSecondary, handlerStyleSecondary]}></Animated.View>
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
    }
})

export default BackgroundProgress