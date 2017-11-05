import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'


class Botao extends Component {
  
  constructor(props) {
    super(props)

    this.styles = StyleSheet.create({
      botao: {
        flex:parseInt(this.props.c) || 1,
        backgroundColor:this.props.bg || '#E0E0E0',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#999999'
      },

      texto: {
        fontSize:16,
        fontWeight:'bold',
        color:this.props.color || '#000000'
      }
    })
  }

  render() {
    return(
        <TouchableOpacity style={this.styles.botao} onPress={this.props.onPress}>
          <Text style={this.styles.texto}>{this.props.campo}</Text>
        </TouchableOpacity>
    )
  }
}


export default class Calculadora extends Component {

  constructor(props) {
    super(props)
    this.state = {resultado:'0'}

    this.digitado = this.digitado.bind(this)
  } 

  digitado(valor) {

    let op = ['/', '*', '+', '-']

    let s = this.state
    if(valor == 'C') {
        s.resultado = '0'
    } else if(s.resultado == '0') {
      s.resultado = valor
    } else if(valor == '=') {
        let x = s.resultado.split('')
        for(let i = 0; i < x.length; i++) {
          if(op.includes(x[i]) && op.includes(x[i + 1])) {
            return false
          }
        }
        
        if(op.includes(x[x.length - 1])) {
          return false
        }

        s.resultado = parseFloat(eval(s.resultado)).toFixed(2)
    } else {
      s.resultado += valor
    }


   

    

    this.setState(s)

  }

  render() {
    return(

      <View style={styles.body}>
        <View style={styles.campoResultado}>
          <Text style={styles.campoResultadoText}>{this.state.resultado}</Text>
        </View>
        <View style={styles.inLine}>
          <Botao c="3" campo="C" bg="#cccccc" onPress={() => this.digitado("C")}/>
          <Botao campo="/" bg="#fd9536" color="#ffffff" onPress={() => this.digitado("/")}/>
        </View>
        <View style={styles.inLine}>
          <Botao campo="7" onPress={() => this.digitado("7")}/>
          <Botao campo="8" onPress={() => this.digitado("8")}/>
          <Botao campo="9" onPress={() => this.digitado("9")}/>
          <Botao campo="*" bg="#fd9536" color="#ffffff" onPress={() => this.digitado("*")}/>
        </View>
        <View style={styles.inLine}>
          <Botao campo="4" onPress={() => this.digitado("4")}/>
          <Botao campo="5" onPress={() => this.digitado("5")}/>
          <Botao campo="6" onPress={() => this.digitado("6")}/>
          <Botao campo="-" bg="#fd9536" color="#ffffff" onPress={() => this.digitado("-")}/>
        </View>
        <View style={styles.inLine}>
          <Botao campo="1" onPress={() => this.digitado("1")}/>
          <Botao campo="2" onPress={() => this.digitado("2")}/>
          <Botao campo="3" onPress={() => this.digitado("3")}/>
          <Botao campo="+" bg="#fd9536" color="#ffffff" onPress={() => this.digitado("+")}/>
        </View>
        <View style={styles.inLine}>
          <Botao c="2" campo="0" onPress={() => this.digitado("0")}/>
          <Botao campo="." onPress={() => this.digitado(".")}/>
          <Botao campo="=" bg="#fd9536" color="#ffffff" onPress={() => this.digitado("=")}/>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  body: {
    paddingTop:20,
    flex:1
  },

  inLine: {
    flexDirection:'row',
    flex:1
  },

  campoResultado: {
    flex:2,
    backgroundColor:'#000000',
    justifyContent:'flex-end'

  },

  campoResultadoText: {
    fontSize:50,
    color:'#ffffff',
    textAlign:'right',
    marginRight:10
  }
})