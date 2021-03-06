import React, { useEffect, useRef } from 'react'
import { StatusBar, FlatList, StyleSheet, Alert } from 'react-native'
import Toolbar from '../components/Toolbar'
import Segment from '../components/ContainerSegment'
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux'
import { editTodo, removeTodo, loadTodos, updateFilter } from '../actions/actionsTodo'

import ContentListTodo from '../components/ContentListTodo'

const Main = ({ navigation, todos, editTodo, removeTodo, loadTodos, updateFilter }) => {

    useEffect(() => {
        loadTodos()
    }, [  ])

    const onPressSegment = value => updateFilter(value)

    const refList = useRef(null)

    const onChecked = item => {
        item.completed = !item.completed
        editTodo(item)
    }

    const onPressDelete = item => {
        Alert.alert('Atenção', 'Deseja realmente excluir esse item?', [
            { text: 'Não' },
            { text: 'Sim', onPress: () => removeTodo( item ) },
        ])
    }

    const scrollToEnd = () => refList.current.scrollToEnd({ animated: true })

    return(
        <>
            <Toolbar title="Todo list" statusBarHeight={StatusBar.currentHeight} />
            <Segment  values={[ 'ALL', 'Todo', 'Complete' ]} onPress={ onPressSegment } />
            <FlatList
                ref={refList}
                style={{flex: 1}}
                data={ todos }
                renderItem={({ item }) => <ContentListTodo onPressDelete={onPressDelete} onChecked ={onChecked} item={item} />}
                keyExtractor={(item) => item.id.toString()}
                onContentSizeChange={scrollToEnd}
                onLayout={scrollToEnd}
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
        todos: state.todos.todoFiltered
    }
}

export default connect(mapStateToProps, { editTodo, removeTodo, loadTodos, updateFilter })(Main)