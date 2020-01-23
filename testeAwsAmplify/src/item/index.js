import React from 'react'
import {View, TextInput, Text, StyleSheet} from 'react-native'
import {API} from 'aws-amplify'

export default function Item() {

    const [name, setName] = React.useState('')


    function postData() { 
        let apiName = 'firstRestApi';
        let path = '/items';
        let payload = {
            body: {
                name
            },
        }
        API.post(apiName, path, payload).then(console.log).catch(console.log);
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Criar item</Text>
            <TextInput onChangeText={setName} placeholder="Nome do item" onEndEditing={postData} />
        </View>
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