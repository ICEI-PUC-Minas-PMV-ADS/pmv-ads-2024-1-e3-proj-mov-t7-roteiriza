import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import React from 'react'



const ContainerInput = ({titleText, placeHolderText, subText, borderColor, borderWidth}) => {
  return (
    <View style={styles.mainContainer}>

        <Text style={styles.text}>{titleText}</Text>

        <TextInput style={styles.input} placeholder={placeHolderText}/>

        <View style={styles.containerThree}>

            <Text style={styles.subtext}> {subText} </Text>

            <TouchableOpacity>
                <Text style={styles.linktext}>Edite agora</Text>
            </TouchableOpacity>

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