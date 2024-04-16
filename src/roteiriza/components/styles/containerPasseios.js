import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import InputNormal from '../styles/inputPadrao'
import InputMenor from '../styles/inputMenor'

const ContainerPasseios= () =>{
    return(
       <View style={styles.container}>             
            <Image source={require('../../assets/img/imgpasseios2.png')} style={styles.img}/>

                <InputNormal 
                    nome={'Nome do Local'} 
                    valor={'Cristo Redentor'} 
                />
                <Image source={require('../../assets/img/localIcon.png')} style={styles.icon}/>

                <InputNormal 
                    nome={'Endereço do Local'} 
                    valor={'Parque Nacional da Tijuca'} 
                />   
                <Image source={require('../../assets/img/adressIcon.png')} style={styles.icon}/>

                <View style={styles.inputbox}>
                    <View style={styles.input}>
                        <InputMenor 
                            nome={'Data'} 
                            valor={'18 de janeiro'}
                        />
                        <Image source={require('../../assets/img/calendar.png')} style={styles.iconLeft}/>
                    </View>

                    <View style={styles.input}>
                        <InputMenor 
                            nome={'Horário'} 
                            valor={'Manhã'}
                        />
                        <Image source={require('../../assets/img/dropdown.png')} style={styles.iconRight}/>
                    </View>
                </View>

                <View style={styles.inputbox}>
                    <View style={styles.input}>
                        <InputMenor 
                            nome={'Transporte'} 
                            valor={'Taxi'}
                        />
                        <Image source={require('../../assets/img/dropdown.png')} style={styles.iconRight}/>
                    </View>

                    <View style={styles.input}>
                        <InputMenor 
                            nome={'Valor a ser gasto'} 
                            valor={'160,00'}
                        />
                        <Image source={require('../../assets/img/moneyIcon.png')} style={styles.iconLeftMoney}/>
                    </View>
                </View>
                
                

       </View> 
    )
}

export default ContainerPasseios;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 25
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
    iconRight: {
        width: 21,
        height: 21,
        bottom: 30,
        left: 9
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
    }
})