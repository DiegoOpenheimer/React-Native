import React from 'react'
import { StatusBar, FlatList, StyleSheet, Text } from 'react-native'
import Toolbar from '../components/Toolbar'
import Segment from '../components/ContainerSegment'
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux'
import { editTodo } from '../actions/actionsTodo'

import ContentListTodo from '../components/ContentListTodo'

const Main = ({ navigation, todos, editTodo }) => {

    const onPressSegment = () => alert('ok')

    const onChecked = (item) => {
        item.completed = !item.completed
        editTodo(item)
    }

    return(
        <>
            <Toolbar title="Todo list" statusBarHeight={StatusBar.currentHeight} />
            <Segment  values={[ 'ALL', 'Todo', 'Complete' ]} onPress={ onPressSegment } />
            <FlatList
                style={{flex: 1}}
                data={ todos }
                renderItem={({ item }) => <ContentListTodo onChecked ={onChecked} item={item} />}
                keyExtractor={(item) => item.id.toString()}
             />
            <FAB 
                style={styles.fab}
                icon="add"
                onPress={() => navigation.navigate('CreateTodo')}
            />
        </>
    )

}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  })

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}

export default connect(mapStateToProps, { editTodo })(Main)