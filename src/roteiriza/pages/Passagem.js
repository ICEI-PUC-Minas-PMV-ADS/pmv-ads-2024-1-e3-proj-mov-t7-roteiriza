import React from 'react';
import { useState } from 'react'
import {View, Text, Image, StyleSheet} from 'react-native';
import  Header  from '../components/Header';
import InputMenor from '../components/inputMenor';
import InputCounter from '../components/inputCounter'
import Button from '../components/buttonAdicionar';

import DropdownTransport from '../components/dropdownTransport';


const Passagem = () =>{
  const [selected, setSelected] = useState("")
  return(

    <View>
      <Header title="Passagem"/>

      <View style={styles.container}>
        <Image source={require('../assets/img/passagemImg.png')} style={styles.img}/>

        <View style={styles.content}>
          <View style={styles.inputbox}>
            <View style={styles.input}>
              <InputMenor
              nome={'Data de Saída'} 
              valor={'15 de Janeiro'}
              />
              <Image source={require('../assets/img/calendar.png')} style={styles.iconLeft}/>
            </View>

            <View>
              <InputMenor
              nome={'Data de Retorno'} 
              valor={'22 de Janeiro'}
              />
              <Image source={require('../assets/img/calendar.png')} style={styles.iconRight}/>
            </View>
        </View>

        <View style={styles.inputbox}>
            <View style={styles.input}>
              <InputCounter 
              style={styles.numberInput}
              nome={'Pessoas'} 
              valor={'2'}
              />
              <View styles={styles.count}>
                <Image source={require('../assets/img/menos.png')} style={styles.iconLeft}/>
                <Image source={require('../assets/img/adicao.png')} style={styles.iconDoubleRight}/>
              </View>
            </View>

            <View style={styles.dropdownContainer}>
              <DropdownTransport 
                selected={selected} 
                setSelected={setSelected} 
                valor={'Avião'} 
                nome={'Transporte'}
              /> 
            </View>
        </View>

        <View style={styles.inputboxLast}>
            <View style={styles.input}>
              <InputCounter 
              style={styles.numberInput}
              nome={'Malas'} 
              valor={'2'}
              />
              <View styles={styles.count}>
                <Image source={require('../assets/img/menos.png')} style={styles.iconLeft}/>
                <Image source={require('../assets/img/adicao.png')} style={styles.iconDoubleRight}/>
              </View>
            </View>

            <View style={styles.inputCost}>
              <InputMenor
              nome={'Valor a ser gasto'} 
              valor={'870,00'}
              />
              <Image source={require('../assets/img/moneyIcon.png')} style={styles.iconRight}/>
            </View>

        </View>

        

       
        </View>
        

        <View style={styles.buttonBox}>
          <Button 
            textButton={"SALVAR"} 
            color='#F5BD60' 
            fontColor='#FFFFFF'
          />

         <Button 
            textButton={"CANCELAR"} 
            color='#FFFFFF' 
            fontColor='#181818' 
            borderColor={'black'} 
            borderWidth={2}
          />
        </View>


      </View>  

      

    </View>
    
  )
}

export default Passagem;

const styles = StyleSheet.create({
  img: {
        marginBottom: 10,
        marginTop: 10,
    },
  container: {
      alignItems: 'center',

  },
  dropdownContainer: {
        position: 'relative',
        zIndex: 1,
  },
  iconLeft: {
        width: 21,
        height: 21,
        bottom: 28,
        left: 9
    },
  iconRight: {
        width: 21,
        height: 21,
        bottom: 30,
        left: 9
    },
  iconDoubleRight: {
        width: 21,
        height: 21,
        bottom: 50,
        left: 100,
    },
  inputbox: {
        flexDirection: 'row',
        gap: 25
    },
  inputboxLast : {
        flexDirection: 'row',
        gap: 25,
        bottom: 20
    },
  buttonBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        bottom: 10,
        top: 10
    },
  content: {
      marginTop: 10
    },
  count: {
      flex: 1,
      flexDirection: 'row'
    },
  inputCost: {
      zIndex: 0
    }
})