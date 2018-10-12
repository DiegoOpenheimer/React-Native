import React from 'react'
import { View, StyleSheet, Text, Image, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native'
import ImageProgress from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';

const goScreen = (navigation, screen) => {
    navigation.navigate(screen)
} 

const FeedItem = props => {

    return (
        <View style={styles.feedContainer}>
            <View style={styles.feedHeader}>
            <Image style={styles.avatar} source={{uri: props.item.avatar}} />
                <TouchableNativeFeedback onPress={() => goScreen(props.navigation, 'Profile')}><Text style={styles.userName}>{props.item.name}</Text></TouchableNativeFeedback>
                <View style={styles.viewDate}>
                    <Image style={styles.imageClock} source={require('../assets/clock.png')} />
                    <Text style={styles.postDate} >{props.item.date_posted}</Text>
                </View>
            </View>
            <View style={styles.feedBody}>
                <TouchableWithoutFeedback onPress={props.pressImage}>
                    <ImageProgress indicator={ProgressPie} indicatorProps={{
                        size: 80,
                        borderWidth: 0,
                        color: 'rgba(150, 150, 150, 1)',
                        unfilledColor: 'rgba(200, 200, 200, 0.2)'
                    }} resizeMode={"cover"} style={{flex: 1}} source={{uri: props.item.url}} />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.areaComments}>
            <View style={styles.comments}>
                {
                    props.item.comments.length > 0 &&
                        <React.Fragment>
                            <TouchableNativeFeedback><Text style={{marginRight:10}}>{props.item.comments[0].name}:</Text></TouchableNativeFeedback>
                            <Text>{props.item.comments[0].txt}</Text>
                        </React.Fragment>
                }
                </View>
                <View style={styles.buttonLike}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#f40c0c', true)}>
                        <View style={styles.areaLike}>
                            <Image style={styles.imageLike} source={require('../assets/like_off.png')} />
                            <Text style={{fontSize: 23, marginRight:10}}>{props.item.like_count}</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#f40c0c', true)}>
                        <View style={styles.areaLike}>
                            <Image style={styles.imageLike} source={require('../assets/comments.png')} />
                            <Text style={{fontSize: 23, marginRight:10}}>{props.item.comments.length}</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
         </View>
    )
}

const styles = StyleSheet.create({
    feedContainer: {
        height: 420,
        width: '100%',
        elevation: 5,
        marginBottom: 10,
        backgroundColor: '#FFF'
    },
    feedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 15,
    },
    userName: {
        width: 150,
        height: 15,
    },
    viewDate: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    postDate:{
		height:'100%',
        marginRight:10,
	},
	feedBody:{
		flex:2,
    },
    imageClock: {
        width: 15,
        height: 15,
        marginRight: 10
    },
    areaComments: {
        backgroundColor: '#FFF',
        flex: 0.5,
        flexDirection: 'row'
    },
    imageLike: {
        height: 30,
        width: 30,
        marginRight: 10,
        marginLeft:10
    },
    areaLike: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight:10
    },
    buttonLike: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        flexDirection:'row'
    },
    comments: {
        marginLeft: 10,
        flexDirection: 'row',
        marginTop:3
    }
})

export default FeedItem