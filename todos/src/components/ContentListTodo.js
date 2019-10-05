import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Checkbox } from 'react-native-paper';
import IconButton from './IconButton'

const ContentListTodo = ({ item, onChecked, onPressDelete }) => {

    const checked = item.completed ? 'checked' : 'unchecked' 

    return (
        <TouchableWithoutFeedback onLongPress={onPressDelete.bind(null, item)} >
            <View style={ [styles.container, item.completed && styles.contentCompleted] }>
                <View style={ styles.row } >
                    <View style={{marginTop: 5}}>
                        <Checkbox 
                            status={checked}
                            onPress={() => onChecked(item)}
                        />
                    </View>
                    <Text numberOfLines={3} ellipsizeMode="tail" style={[styles.content, item.completed && {textDecorationLine: 'line-through'}]} allowFontScaling={ false } >
                        { item.task }
                    </Text>
                </View>
                <View style={styles.contentButton} >
                    <IconButton
                        onPress={onPressDelete.bind(null, item)}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center', 
        flex: 1
    },
    content: {
        fontSize:24,
        marginLeft: 8,
    },
    contentButton: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    contentCompleted: {
        backgroundColor: 'rgba(187, 192, 201, .2)'
    }
})

export default ContentListTodo