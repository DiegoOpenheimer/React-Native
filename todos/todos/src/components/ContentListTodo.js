import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Checkbox } from 'react-native-paper';
import IconButton from './IconButton'

const ContentListTodo = ({ item, onChecked }) => {

    const checked = item.completed ? 'checked' : 'unchecked' 

    return (
        <View style={ styles.container }>
            <View style={ styles.row } >
                <View style={{marginTop: 5}}>
                    <Checkbox 
                        status={checked}
                        onPress={() => onChecked(item)}
                    />
                </View>
                <Text style={styles.content} allowFontScaling={ false } >
                    { item.task }
                </Text>
            </View>
            <IconButton
                onPress={() => console.log('Pressed')}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    content: {
        fontSize:24,
        marginLeft: 8,
    }
})

export default ContentListTodo