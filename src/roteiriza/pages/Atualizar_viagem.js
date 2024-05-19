import { StyleSheet, View } from 'react-native';

import Button from '../components/button';
import ContainerTitle from '../components/ContainerTitle';
import ContainerInput from '../components/ContainerInput';
import { Background } from '../components/ContainerTitle';



const Atualizar_viagem = ({ user, handleAuthentication, userId, objectUser }) => {
  return (
    <Background style={styles.container} colors={['#75B1FA', '#063A7A']}>

        <ContainerTitle/>

        <ContainerInput 
          titleText={"Destino da viagem"} 
          subText={"Quer mudar o destino ?"} 
          placeHolderText={"Rio de janeiro"}
        />
        <ContainerInput 
          titleText={"Data de início da viagem"} 
          subText={"Quer mudar a data de inicio ?"} 
          placeHolderText={"16 de janeiro"}
        />
        <ContainerInput 
          titleText={"Data final da viagem"} 
          subText={"Quer mudar a data final ?"} 
          placeHolderText={"22 de janeiro"}
        />

        <View style={styles.containerButtons} >
            <Button textButton={"SALVAR"} color="#F5BD60"/>
            <Button textButton={"CANCELAR"} borderColor={'white'} borderWidth={2}/>
        </View>

    </Background>
  );
}

export default Atualizar_viagem


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#75B1FA',
    justifyContent: 'space-evenly',
  },

  containerButtons: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

});