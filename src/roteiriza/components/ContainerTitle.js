import { StyleSheet, View, Text} from 'react-native';
import React from 'react'
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';




const ContainerTitle = () => {
  return (
    <View style={styles.mainContainer} >
        <View style={styles.containerOne}>
            <Text style={styles.text}>Atualize sua viagem</Text>
        </View>
        <View style={styles.containerTwo}>
            <Text style={styles.subtext}>Atualize as informações sobre a sua viagem.</Text>
        </View>
      </View>
  )
}

export const Background = styled(LinearGradient) 
`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`
;

export default ContainerTitle

const styles = StyleSheet.create({
    containerOne: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    containerTwo: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 5,
      },
      text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 33,
    },
      subtext: {
        color: 'white',
        fontWeight:'200',
        fontSize: 15,
    },
      mainContainer: {
        height:80,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})