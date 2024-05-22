import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import React from 'react'



const ContainerEmergencia = ({titleText, placeHolderText, subText, value, onChangeText}) => {
  return (
    <View style={styles.container_content}>

        <View>
          <Text style={styles.firstText}>{titleText}</Text>
        </View>

        <View>
          <Text style={styles.secondText}>{subText}</Text>
        </View>

        <View>
          <TextInput style={styles.input} placeholder={placeHolderText} value={value} onChangeText={onChangeText}/>
        </View>
    </View>

  )
}

export default ContainerEmergencia

const styles = StyleSheet.create({

  container_content: {
    width: '100%',
    height: 120,
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },

  firstText: {
    color: "#75B1FA",
    fontSize: 20,
    fontWeight: 'bold',
  },

  secondText: {
    color: "#063A7A",
    fontSize: 17,
    fontWeight: 'bold',
  },

  input: {
    padding:7,
    borderRadius:10,
    borderWidth:2,
    borderColor:'#CACACA',
  },

})
