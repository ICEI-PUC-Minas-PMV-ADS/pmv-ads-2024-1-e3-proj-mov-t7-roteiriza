
import { StyleSheet, View } from 'react-native';
import Button from './styles/button';
import ContainerTitle from './styles/containerTitle';
import ContainerInput from './styles/containerInput';



const Atualizar_viagem = () => {
  return (
    <View style={styles.container}>


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
    </View>
  );
}

export default Atualizar_viagem


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#75B1FA',
    borderRadius: 10,
    justifyContent: 'space-evenly',
  },

  containerButtons: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

});
