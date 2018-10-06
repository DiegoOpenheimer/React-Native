import React from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, FlatList } from 'react-native'
import FakeFeed from '../components/FakeFeed'
import FeedItem from '../components/FeedItem'

export default class Feed extends React.Component {

    state = {
        feedFake: new Array()
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({feedFake:  [{"id":"3","id_user":"3","url":"https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/photos\/i3.jpg","date_posted":"2018-01-01 14:30:00","name":"testador","avatar":"https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/avatar\/default.jpg","like_count":"0","comments":[{"id":"1","id_user":"1","id_photo":"3","date_comment":"2018-01-01 18:00:00","txt":"Show de bola!","name":"Bonieky"}]},{"id":"2","id_user":"2","url":"https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/photos\/i2.jpg","date_posted":"2018-01-01 13:45:00","name":"Testador","avatar":"https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/avatar\/default.jpg","like_count":"0","comments":[]},{"id":"1","id_user":"2","url":"https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/photos\/i1.jpg","date_posted":"2018-01-01 12:30:00","name":"Testador","avatar":"https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/avatar\/default.jpg","like_count":"2","comments":[]}]})
        }, 1000)
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor="rgba(0, 0, 0, .4)" />
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
                        renderItem={({item}) => <FeedItem item={item} navigation={this.props.navigation}/>}
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