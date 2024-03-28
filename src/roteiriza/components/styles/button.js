import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react'



const Button = ({textButton, onpress, color, borderColor, borderWidth}) => {
  return (
    <TouchableOpacity onPress={onpress} 
    style={[styles.button,
    {backgroundColor: color},
    {borderColor: borderColor},
    {borderWidth: borderWidth}
    ]}>
        <Text style={styles.text} >{textButton}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    }
})