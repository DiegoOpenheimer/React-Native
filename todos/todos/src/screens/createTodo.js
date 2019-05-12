import React, { useState } from 'react'
import { StatusBar, StyleSheet, View, TouchableWithoutFeedback, Keyboard, ToastAndroid, Alert } from 'react-native'
import Toolbar from '../components/Toolbar'
import { TextInput, Button } from 'react-native-paper'
import { addTodo } from '../actions/actionsTodo'
import { connect } from 'react-redux'


const CreateTodo = ({ navigation, addTodo }) => {

    const [ text, setText ] = useState('')
    const createTodo = () => {
        Keyboard.dismiss()
        if (text) {
            const item = {
                id: new Date().getTime(),
                task: text,
                completed: false
            }
            addTodo(item)
            ToastAndroid.show('Todo saved', ToastAndroid.SHORT)
            navigation.goBack()
        } else {
            Alert.alert('Atenção', 'Preencha o campo')
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.container}>
                <Toolbar title="Add Todo" statusBarHeight={StatusBar.currentHeight} action={() => navigation.goBack()} />
                <View style={styles.content}>
                    <TextInput
                        mode="outlined"
                        label="Enter todo"
                        value={text}
                        onChangeText={setText}
                        onSubmitEditing={createTodo}
                    />
                </View>
                <View style={styles.content}>
                    <Button onPress={createTodo} mode="contained">Salvar</Button>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 16
    }
})


export default connect(undefined, { addTodo })(CreateTodo)