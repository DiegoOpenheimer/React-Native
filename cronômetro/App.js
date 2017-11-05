import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'


class Botao extends Component {
  
  constructor(props) {
    super(props)

    this.styles = StyleSheet.create({
      botao: {
        backgroundColor:'#baa07a',
        borderWidth:1,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        marginLeft:10,
        marginRight:10
      },

      textBotao: {
        color:'#2c1f30',
        fontWeight:'bold'
      }
    })

  }

  render() {
    return(
 
          <TouchableOpacity style={this.styles.botao} onPress={this.props.onPress}>
            <Text style={this.styles.textBotao}>{this.props.name}</Text>
          </TouchableOpacity>


    )
  }
}


export default class Cronometro extends Component {

  constructor(props) {
    super(props)
    this.state = {time:0, acao:'Iniciar'}
    this.timer = null

    this.init = this.init.bind(this)
    this.stop = this.stop.bind(this)

  }

  init() {
    let s = this.state

    if(this.timer) {
      clearInterval(this.timer)
      this.timer = null
      s.acao = 'Iniciar'
    } else {
      this.timer = setInterval(() => {
        s.time += 0.1
        this.setState(s)
      }, 100)

      s.acao = 'Parar'
    }

    this.setState(s)

  }

  stop() {
    let s = this.state
    s.acao = 'Iniciar'
    if(this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    s.time = 0
    this.setState(s)
  }

  render() {
    return(
      <View style={styles.body}>
        <Image source={require('./images/relogio.png')}/>    
        <Text style={styles.time}>{this.state.time.toFixed(1)}</Text>
        <View style={styles.botaoArea}>
        <Botao name={this.state.acao} onPress={this.init}/>
        <Botao name="Limpar" onPress={this.stop}/>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  body: {
    paddingTop:20,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#2c1f30'
  },

  time: {
    color:'#baa07a',
    fontSize:50,
    marginTop:-140,
    fontWeight:'bold'
  },
  
  botaoArea: {
    height:40,
    marginTop:85,
    flexDirection:'row'

  }
})
