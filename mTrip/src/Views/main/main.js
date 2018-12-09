import React, { Component } from 'react'
import { View, Text, ImageBackground, StatusBar, TouchableWithoutFeedback, Image, TouchableNativeFeedback } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import BACKGROUND from '../../../assets/background.png'
import TRIP from '../../../assets/Cópia-de-Tripplanner.png'
import LOGO from '../../../assets/LOGO.png'
import PIN from '../../../assets/pin.png'
import ARROW from '../../../assets/arrow_right.png'
import styles from './style'
import { loadTrips } from '../../actions/trips'


class Main extends Component {

    state = {
        step: 0
    }

    componentDidMount() {
       this.props.loadTrips()
    }

    handlerBtnBottom = () => this.setState({step: 1})

    navigationPage = () => {
        const stackActions = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Trips'})]
        })
        this.props.navigation.dispatch(stackActions)
    }

    stepView = () => {
        const { step } = this.state
        if (step) {
            return (
                <View style={styles.stepEmpty}>
                    <Image style={styles.imgPin} resizeMode="contain" source={PIN} />
                    <Text style={styles.stepEmptyText}>Vamos planejar sua viagem?</Text>
                    <TouchableNativeFeedback onPress={this.navigationPage} background={TouchableNativeFeedback.Ripple('#CECECE', true)}>
                        <View style={styles.btnArrow}>
                            <Image source={ARROW} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            )
        } else {
            return (<TouchableWithoutFeedback onPress={this.handlerBtnBottom}>
                <View style={styles.btnBottom}>
                    <Text>COMEÇAR</Text>
                </View>
            </TouchableWithoutFeedback>)
        }
    }

    render() {
        return(
            <ImageBackground resizeMode="cover" source={BACKGROUND} style={styles.container}>
                <StatusBar translucent={true} barStyle="dark-content" backgroundColor="transparent" />
                <View style={styles.content}>
                    <Image resizeMode="contain" style={styles.imgTrip} source={TRIP} />
                </View>
                <Image resizeMode="contain" style={styles.imgLOGO} source={LOGO} />
                { this.stepView() }
            </ImageBackground>
        )
    }

}

const mapStateToProps = state => {
    return {
        trips: state.handlerTrips.trips
    }
}

export default connect(() => ({}), { loadTrips })(Main)
