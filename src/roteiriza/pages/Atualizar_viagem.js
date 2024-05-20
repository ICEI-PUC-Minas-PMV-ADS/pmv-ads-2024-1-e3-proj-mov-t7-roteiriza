import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { firestore } from '../firebase/config';
import { doc, getDoc, updateDoc } from '@firebase/firestore';

import Button from '../components/button';
import ContainerTitle from '../components/ContainerTitle';
import ContainerInput from '../components/ContainerInput';
import { Background } from '../components/ContainerTitle';

const Atualizar_viagem = () => {
  const [destinoUser, setDestinoUser] = useState('');
  const [dtInicial, setDtInicial] = useState('');
  const [dtFinal, setDtFinal] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const route = useRoute();
  const { viagemId } = route.params;

  useEffect(() => {

    if (!isLoaded) {
      carregarDados();
    }  

  }, [isLoaded, viagemId]);


  const carregarDados = async () => {
    if(isLoaded == false){
      try {
        const docRef = doc(firestore, 'viagem', viagemId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDestinoUser(data.Destino_Viagem);
          setDtInicial(data.DataInicio_Viagem);
          setDtFinal(data.DataFinal_Viagem);
          setIsLoaded(true);
        } else {
          console.log('Sem viagens cadastradas');
        }
      } catch (error) {
        console.log('Ocorreu um erro: ', error);
      }
    }
    else{
      console.log('Os dados já foram carregados')
    }
  };

  const salvarDados = async () => {
    try {
      if (destinoUser !== '' && dtInicial !== '' && dtFinal !== '') {
        const docRef = doc(firestore, 'viagem', viagemId);

        await updateDoc(docRef, {
          Destino_Viagem: destinoUser,
          DataInicio_Viagem: dtInicial,
          DataFinal_Viagem: dtFinal,
        });
        console.log('Dados atualizados com sucesso');
      } else {
        console.log('Preencha os campos corretamente');
      }
    } catch (error) {
      console.log('Ocorreu um erro ao salvar os dados', error);
    }
  };

  return (
    <Background style={styles.container} colors={['#75B1FA', '#063A7A']}>
      <ContainerTitle />

      <ContainerInput
        titleText={'Destino da viagem'}
        subText={'Quer mudar o destino ?'}
        value={destinoUser}
        onChangeText={setDestinoUser}
      />
      <ContainerInput
        titleText={'Data de início da viagem'}
        subText={'Quer mudar a data de início ?'}
        value={dtInicial}
        onChangeText={setDtInicial}
      />
      <ContainerInput
        titleText={'Data final da viagem'}
        subText={'Quer mudar a data final ?'}
        value={dtFinal}
        onChangeText={setDtFinal}
      />

      <View style={styles.containerButtons}>
        <Button textButton={'SALVAR'} color="#F5BD60" onpress={salvarDados} />
        <Button textButton={'CANCELAR'} borderColor={'white'} borderWidth={2} />
      </View>
    </Background>
  );
};

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