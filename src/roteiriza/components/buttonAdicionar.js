import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react'



const Button = ({textButton, onpress, color, borderColor, borderWidth, fontColor}) => {
  return (
    <TouchableOpacity onPress={onpress} 
    style={[styles.button,
    {backgroundColor: color},
    {borderColor: borderColor},
    {borderWidth: borderWidth},
    
    ]}>
        <Text style={[styles.text, { color: fontColor }]} >{textButton}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        width: 140,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
    }
})