import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class Select extends React.Component {

    state = {
        current: 0
    }

    componentDidMount() {
        this.setState({current: this.props.selected})
    }

    handlerSelect = (index, option) => () => {
        this.setState({current: index})
        if (this.props.onSelected) {
            this.props.onSelected(index, option)
        }
    }

    mountOptions = (options, current) => {
        return options.map((option, index) => (
            <TouchableOpacity onPress={this.handlerSelect(index, option)} key={index} activeOpacity={0.7} style={[styles.button, current === index ? styles.buttonSelected : null]}>
                <Text style={[styles.textButton, current === index ? styles.textButtonSelected : null]}>{option}</Text>
            </TouchableOpacity>
        ))
    }

    render() {
        const { styleContent, options, label } = this.props
        return (
            <View style={styleContent}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.containerButtons}>
                    { this.mountOptions(options, this.state.current) }
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    containerButtons: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around'
    },
    label: {
        color: '#FFF',
        fontSize: 24,
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center'
    },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, .3)'
    },
    textButton: {
        color: '#FFF',
        fontFamily: 'Ubuntu-Bold'
    },
    buttonSelected: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    textButtonSelected: {
        color: '#000',
        fontFamily: 'Ubuntu-Bold'
    },
})

export default Select