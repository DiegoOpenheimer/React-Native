import React from 'react'
import {View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native'
import {API, graphqlOperation} from 'aws-amplify'
import * as mutations from '../graphql/mutations'

export default function Post() {

    const [title, setTitle] = React.useState('')
    const [comment, setComment] = React.useState('')

    async function savePost() {
        if (!title) {
            Alert.alert('Title is empty')
            return
        }
        const post = {
            title
        }
        try {
            const postCreated = await API.graphql(graphqlOperation(mutations.createPost, {input: post}))
            await API.graphql(graphqlOperation(mutations.createComment, {input: { content: comment, commentPostId: postCreated.data.createPost.id }}))
            Alert.alert('Post created with success')
        } catch(error) {
            console.log(error)
            Alert.alert('Fail to create a post')
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.text}>Add a post</Text>
                <TextInput onChangeText={setTitle} placeholder="Inform title" />
                <Text style={styles.text}>Add a coment</Text>
                <TextInput onEndEditing={savePost} onChangeText={setComment} placeholder="Inform comment" />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 16
    },
    text: {
        textAlign: 'center'
    }
})