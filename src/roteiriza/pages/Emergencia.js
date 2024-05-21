import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/button';
import { Background } from '../components/ContainerTitle';
import ContainerEmergencia from '../components/ContainerEmergencia';


const Emergencia = () => {

    



  return (
    <Background style={styles.container} colors={['#ffff', '#ffff']}>
      <View style={styles.container_main}>
        <ContainerEmergencia titleText={"HOSPITAL:"} subText={"Endereço:"} placeHolderText={"Av.Francisco Sales"}/>

        <ContainerEmergencia titleText={"CORPO DE BOMBEIROS:"} subText={"Telefone:"} placeHolderText={"193"}/>

        <ContainerEmergencia titleText={"SAMU:"} subText={"Telefone:"} placeHolderText={"192"}/>

        <ContainerEmergencia titleText={"POLÍCIA:"} subText={"Telefone:"} placeHolderText={"190"}/>

        <Button color={"#F5BD60"} textButton={"SALVAR"}/>
      </View>
    </Background>
  );
}

export default Emergencia;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10
  },
  container_main: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    width: '100%',
    height: 650,
  }

});