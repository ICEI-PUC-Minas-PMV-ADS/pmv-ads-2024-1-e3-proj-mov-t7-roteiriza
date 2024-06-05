import React from 'react';
import {Text, View, Image, StyleSheet, TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Input from './Input';

const InputMenor = ({nome, valor, value, onChangeText}) => {
    return(
        <View>
            <Text style={styles.textInput}>{nome}</Text>
            <TextInput
                keyboardType='date'
                style={styles.inputMenor}
                placeholder={valor}
                placeholderTextColor={'#B5B3B3'}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}


export default InputMenor;

const styles = StyleSheet.create({
    inputMenor: {
            backgroundColor: '#fff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: 10,
            paddingStart: 34,
            borderWidth: 1,
            borderColor: '#CACACA',
            width: 130,
            height: 35, 
            fontSize: 14
         
          },
          
    textInput: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#063A7A',
        paddingBottom: 2
    }
})
