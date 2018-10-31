import React from 'react'
import { View, Text, StyleSheet, StatusBar, FlatList, Alert } from 'react-native'
import { ActionButton, Toolbar } from 'react-native-material-ui';
import { connect } from 'react-redux'
import { getContacts, updateList } from '../actions/contacts'
import ListItem from './ComponentList'

class Main extends React.Component {

    state = {
        filterList: []
    }

    componentDidMount() {
        this.props.getContacts()
    }

    componentWillReceiveProps(newProps) {
        this.setState({filterList: newProps.contacts})
    }

    removePerson = (item) => {
        Alert.alert('Atenção', 'Deseja realmente excluir?', [
            {text: 'Não'},
            { text: 'Sim', onPress: () => {
                const list = [...this.props.contacts]
                const index = list.map(i=>i.id).indexOf(item.id)
                if (index !== -1) {
                    list.splice(index, 1)
                    this.props.updateList(list)
                }
            } }
        ])
    }

    render() {
        return (
            <React.Fragment>
                <StatusBar translucent={true} backgroundColor="rgba(0,0,0,.3)" />
                <Toolbar
                    style={header}
                    centerElement="Contatos"
                    searchable={{placeholder:'Informe nome',autoCapitalize:"none" ,onChangeText: (text) => {
                        const list = [...this.props.contacts]
                        const filtered = list.filter(person => person.name.toUpperCase().includes(text.toUpperCase()) || person.email.toUpperCase().includes(text.toUpperCase()))
                        if (filtered.length) {
                            this.setState({filterList: filtered})
                        } else {
                            this.setState({filterList: list})
                        }
                    }}}
                    rightElement={{
                        menu: {
                            icon:'more-vert',
                            labels: ['Ordenar de a-z', 'Ordenar de z-a']
                        }
                    }}
                    onRightElementPress={label => {
                        let list = []
                        switch (label.index) {
                            case 0:
                                list = [...this.state.filterList]
                                this.setState({filterList: list.sort((a, b)=>{
                                    if (a.name.toUpperCase() < b.name.toUpperCase()) return -1
                                    else if (a.name.toUpperCase() > b.name.toUpperCase()) return 1
                                    else return 0
                                })})
                                break
                            case 1:
                                list = [...this.state.filterList]
                                this.setState({filterList: list.sort((a, b)=>{
                                    if (b.name.toUpperCase() < a.name.toUpperCase()) return -1
                                    else if (b.name.toUpperCase() > a.name.toUpperCase()) return 1
                                    else return 0
                                })})
                                break
                        }
                     }}
                 />       
                <View style={styles.container}>
                    <FlatList
                        style={{flex:1}}
                        data={this.state.filterList}
                        renderItem={({item}) => <ListItem item={item} onClick={this.removePerson}/>}
                        keyExtractor={(item, index) => item.id.toString()}
                    />
                    <ActionButton onPress={() => this.props.navigation.navigate('Information')} />
                </View>
            </React.Fragment>
        )
    }

}
const header = {
    container: {
        backgroundColor:'red',
        height:StatusBar.currentHeight+ 56,
        paddingTop: StatusBar.currentHeight
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    }
})

const mapStateToProps = state => {
    return {
        contacts: state.contacts.allContacts
    }
}

export default connect(mapStateToProps, { getContacts, updateList })(Main)