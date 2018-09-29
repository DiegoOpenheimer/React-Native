import React from 'react'
import { View, StyleSheet } from 'react-native'

const FakeFeed = () => {
    return (
        <View style={styles.feedContainer}>
            <View style={styles.feedHeader}>
                <View style={styles.avatar}></View>
                <View style={styles.userName}></View>
                <View style={styles.viewDate}>
                    <View style={styles.postDate}></View>
                </View>
            </View>
            <View style={styles.feedBody}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    feedContainer: {
        height: 300,
        width: '100%',
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
        backgroundColor: '#CCC',
        marginLeft: 10,
        marginRight: 15,
    },
    userName: {
        width: 150,
        height: 15,
        backgroundColor: '#CCC'
    },
    viewDate: {
        flex:1,
        alignItems: 'flex-end',
    },
    postDate:{
		width:80,
		height:15,
		backgroundColor:'#CCCCCC',
		marginRight:10
	},
	feedBody:{
		flex:1,
		backgroundColor:'#CCCCCC'
	}
})

export default FakeFeed