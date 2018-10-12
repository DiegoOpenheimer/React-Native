import React from 'react'
import { View, StyleSheet, StatusBar, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import Menu, { MenuItem } from 'react-native-material-menu';
import { Toolbar } from 'react-native-material-ui';
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'

import { logout } from '../actions/auth'
import FakeFeed from '../components/FakeFeed'
import FeedItem from '../components/FeedItem'
import ICON_MENU from '../assets/icon-menu.png'


const styleToolbar = {
    container: {
        backgroundColor: '#4da2d8',
        paddingTop: StatusBar.currentHeight,
        height: 50+StatusBar.currentHeight
    },
    centerElementContainer: {
        alignItems: 'center'
    }
}

class Feed extends React.Component {

    state = {
        feedFake: new Array(),
        imageClickCount: 0
    }

    pressButtomImage = () => {
        const { imageClickCount } = this.state
        const result = imageClickCount + 1
        if ( imageClickCount < 1 ) {
            this.setState({imageClickCount: result})
            setTimeout(() => this.setState({imageClickCount: 0}), 500)
        } else {
            alert('liked')
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({feedFake:  [{"id":"3","id_user":"3","url":"https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/photos\/i3.jpg","date_posted":"2018-01-01 14:30:00","name":"testador","avatar":"https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/avatar\/default.jpg","like_count":"0","comments":[{"id":"1","id_user":"1","id_photo":"3","date_comment":"2018-01-01 18:00:00","txt":"Show de bola!","name":"Bonieky"}]},{"id":"2","id_user":"2","url":"https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/photos\/i2.jpg","date_posted":"2018-01-01 13:45:00","name":"Testador","avatar":"https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/avatar\/default.jpg","like_count":"0","comments":[]},{"id":"1","id_user":"2","url":"https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/photos\/i1.jpg","date_posted":"2018-01-01 12:30:00","name":"Testador","avatar":"https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/avatar\/default.jpg","like_count":"2","comments":[]}]})
        }, 1000)
    }

    hideMenu = () => {
        this.menu.hide()
        this.props.logout()
        this.resetNavigation()
    }

    showMenu = () => {
        this.menu.show()
    }

    resetNavigation = () => {
        const stackAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({routeName: 'Login'})]
        })
        this.props.navigation.dispatch(stackAction)
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor="rgba(0, 0, 0, .4)" />
                <Toolbar
                    style={styleToolbar}
                    centerElement="Feed"
                    rightElement={
      
                    <Menu
                    ref={r => this.menu = r}
                    button={<TouchableOpacity onPress={this.showMenu}>
                        <View style={{width: 35, height: '100%', justifyContent:'center', alignItems: 'center'}}>
                            <Image source={ICON_MENU} style={{width:20, height:20}}  />
                        </View>
                    </TouchableOpacity>}
                    >
                        <MenuItem onPress={this.hideMenu}>Sair</MenuItem>
                    </Menu>
                    
                    }
                    onRightElementPress={ (label) => { console.log(label) }}
                />
                {
                    !this.state.feedFake.length &&
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FakeFeed />
                        <FakeFeed />
                        <FakeFeed />
                    </ScrollView> 
                }
                {
                    this.state.feedFake.length !== 0 &&
                    <FlatList
                        data={this.state.feedFake}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => <FeedItem item={item} pressImage={this.pressButtomImage} navigation={this.props.navigation}/>}
                     />
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff'
    }
})

export default connect(() => ({}), { logout })(Feed)