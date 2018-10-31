import React from 'react'
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import ImageView from 'react-native-image-view'

class CardConversa extends React.Component  {

    constructor(props) {
        super(props)
        this.state = {
            showImageView: false,
            images: new Array()
        }
        this.getCardConversa = this.getCardConversa.bind(this)
    }

    componentWillMount(){
        if(this.props.data.type !== 'text') {
            let images = this.state.images
            images.push({
                source: {
                    uri: this.props.data.message
                }
            })
            this.setState({images})
        }
    }

    render(){
        let myStyles = {
            backgroundColor: this.props.data.id === this.props.me ? '#9999FF':'#ffbf00',
            alignSelf: this.props.data.id === this.props.me ? 'flex-end' : 'flex-start',
         }
        let info = {
            textAlign:this.props.data.id === this.props.me ? 'right' : 'left'
        }  
        return (
            <View style={[styles.container, myStyles]}>
                {this.getCardConversa(this.props.data)}
                <Text style={[styles.info, info]}>
                    {this.props.data.date}
                </Text>
            {
                this.state.images.length > 0 &&
                <ImageView
                    images={this.state.images}
                    imageIndex={0}
                    isVisible={this.state.showImageView}
                    renderFooter={(currentImage) => (<View><Text style={{fontSize:32}}>DevApps</Text></View>)}
                    onClose={()=>this.setState({showImageView:false})}
                />
            }
            </View>
        )
    }
     getCardConversa(data) {
        if(data.type === 'text') {
            return (
                <Text style={styles.message}>
                    {data.message}
                </Text>
            )
        } else {
            let imgSize = {
                width: data.informationImage.width > 200 ? 200 : data.informationImage.width,
                height: data.informationImage.height > 200 ? 200 : data.informationImage.height
            }   
            return (
                <TouchableWithoutFeedback onPress={()=>{this.setState({showImageView: !this.state.showImageView})}}>
                    <Image source={{uri:data.message}} style={imgSize} />
                </TouchableWithoutFeedback>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '80%',
        margin: 10,
        padding: 10,
        borderRadius:2,
    },
    message: {
        fontSize: 18
    },
    info: {
        marginTop:5
    },
    imageMessage: {
        width:200,
        height:200
    }
})

export default CardConversa