import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import ImageProgress from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';

const FeedItem = props => {
    return (
        <View style={styles.feedContainer}>
            <View style={styles.feedHeader}>
            <Image style={styles.avatar} source={{uri: props.item.avatar}} />
                <Text style={styles.userName}>{props.item.name}</Text>
                <View style={styles.viewDate}>
                    <Text style={styles.postDate} >{props.item.date_posted}</Text>
                </View>
            </View>
            <View style={styles.feedBody}>
                <ImageProgress indicator={ProgressPie} indicatorProps={{
                    size: 80,
                    borderWidth: 0,
                    color: 'rgba(150, 150, 150, 1)',
                    unfilledColor: 'rgba(200, 200, 200, 0.2)'
                }} resizeMode={"cover"} style={{flex: 1}} source={{uri: props.item.url}} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    feedContainer: {
        height: 300,
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
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    postDate:{
		height:15,
		marginRight:10
	},
	feedBody:{
		flex:1,
	}
})

export default FeedItem