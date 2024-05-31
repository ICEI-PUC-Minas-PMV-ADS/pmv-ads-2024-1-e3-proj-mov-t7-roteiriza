import React from 'react';
import {Text, View, Image, StyleSheet, TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Input from './Input';


const InputNormal = ({nome, valor, value, onChangeText}) =>{
    return(
        <View style={styles.containerPasseios}>
            <Text style={styles.textInput}>{nome}</Text>
            <TextInput
                keyboardType='text'
                style={styles.inputNormal}
                placeholder={valor}
                placeholderTextColor={'#B5B3B3'}
                alue={value}
                onChangeText={onChangeText}
            />
        </View>
    
    )
  }

export default InputNormal;

const styles = StyleSheet.create({
    inputNormal: {
            backgroundColor: '#fff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: 10,
            paddingStart: 37,
            borderWidth: 1,
            borderColor: '#CACACA',
            width: 283,
            height: 35, 
            fontSize: 14
         
          },
          
    containerPasseios: {
        marginTop: 0
    },

    textInput: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#063A7A',
        paddingBottom: 2
    }
})

