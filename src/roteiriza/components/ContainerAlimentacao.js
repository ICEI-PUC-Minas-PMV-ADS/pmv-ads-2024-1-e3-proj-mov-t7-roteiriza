import React, { useState } from 'react';
import {View, Image, StyleSheet} from 'react-native';
import InputNormal from '../components/inputPadrao'
import InputMenor from '../components/inputMenor'
import DropdownHour from '../components/dropdownHour'


const ContainerAlimentacao = () =>{
const [selectedHour, setSelectedHour] = useState("");
const [selectedTransport, setSelectedTransport] = useState("");

    return(

       <View style={styles.container}>    

            <Image source={require('../assets/img/imgalimentacao2.png')} style={styles.img}/>

                <InputNormal 
                    nome={'Nome do Local'} 
                    valor={'Cristo Redentor'} 
                />
                <Image source={require('../assets/img/localIcon.png')} style={styles.icon}/>

                <InputNormal 
                    nome={'Endereço do Local'} 
                    valor={'Parque Nacional da Tijuca'} 
                />   
                <Image source={require('../assets/img/adressIcon.png')} style={styles.icon}/>

                <View style={styles.inputbox}>
                    <View style={styles.input}>
                        <InputMenor 
                            nome={'Data'} 
                            valor={'18 de janeiro'}
                        />
                        <Image source={require('../assets/img/calendar.png')} style={styles.iconLeft}/>
                    </View>

                    <View style={styles.dropdownContainer}>
                      <DropdownHour 
                        selected={selectedHour}
                        setSelected={setSelectedHour} 
                        valor={'Manhã'} 
                        nome={'Horário'}
                      /> 
                    </View>
                </View>

                <View style={styles.inputbox}>
                    <View style={styles.dropdownContainer}>
                      <DropdownTransport 
                        selected={selectedTransport}
                        setSelected={setSelectedTransport}
                        valor={'Avião'} 
                        nome={'Transporte'}
                      /> 
                    </View>

                    <View style={styles.input}>
                        <InputMenor 
                            nome={'Valor a ser gasto'} 
                            valor={'160,00'}
                        />
                        <Image source={require('../assets/img/moneyIcon.png')} style={styles.iconLeftMoney}/>
                    </View>
                </View>
              

       </View> 

    )
}

export default ContainerAlimentacao;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 25,
        marginTop: 0,
        marginBottom: 50
    },
    icon: {
        width: 21,
        height: 21,
        bottom: 28,
        right: 120
    },
    iconLeft: {
        width: 21,
        height: 21,
        bottom: 28,
        left: 12
    },
    iconLeftMoney : {
        width: 21,
        height: 21,
        bottom: 28,
        left: 12
    },
    img: {
        marginBottom: 10
    },
    inputbox: {
        flexDirection: 'row',
        gap: 25
    },
    dropdownContainer: {
        position: 'relative',
        zIndex: 1,
  }, 
})