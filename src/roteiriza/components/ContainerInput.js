import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import React from 'react'



const ContainerInput = ({titleText, onFocus, placeHolderText, subText, borderColor, borderWidth, value, onChangeText }) => {
  return (
    <View style={styles.mainContainer}>

        <Text style={styles.text}>{titleText}</Text>

        <TextInput style={styles.input} value={value} onChangeText={onChangeText} onFocus={onFocus}/>

        <View style={styles.containerThree}>

            <Text style={styles.subtext}> {subText} </Text>

        </View>

    </View>
  )
}

export default ContainerInput

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        padding:10,
        borderRadius:13,
      },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
      },
      subtext: {
        color: '#CACACA',
        fontWeight: 'normal',
      },
    linktext: {
        color: '#75B1FA',
        fontWeight: 'normal',
      },

      mainContainer: {
        height: 105,
        justifyContent: 'space-between',
      },
      containerThree: {
        flexDirection: 'row',
        gap: 5,
        alignItems:'center',
        justifyContent: 'center',
      }

})