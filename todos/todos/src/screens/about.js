import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import Toolbar from '../components/Toolbar'
import { connect } from 'react-redux'


const About = ({ all }) => {
    console.log(all)
    const completedTask = all.filter(todo => todo.completed).length
    const pendingTask = all.filter(todo => !todo.completed).length
    return(
        <>
            <Toolbar title="About" statusBarHeight={StatusBar.currentHeight} />
            <View style={styles.container}>
                <Text style={styles.contentText} >Completed tasks: { completedTask }</Text>
                <Text style={styles.contentText} >Pending tasks: { pendingTask }</Text>
                <Text style={styles.contentText} >Number of tasks: { all.length }</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentText: {
        margin: 10,
        fontSize: 20
    }
})

const mapStateToProps = state => {
    return {
        all: state.todos.all,
    }
}

export default connect(mapStateToProps)(About)