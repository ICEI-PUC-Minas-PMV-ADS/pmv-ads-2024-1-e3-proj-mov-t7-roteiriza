import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { firestore } from '../firebase/config';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Button from '../components/button';
import ContainerTitle from '../components/ContainerTitle';
import ContainerInput from '../components/ContainerInput';
import { Background } from '../components/ContainerTitle';
import moment from 'moment';
import 'moment/locale/pt-br';

const Atualizar_viagem = () => {
  const [destinoUser, setDestinoUser] = useState('');
  const [dtInicial, setDtInicial] = useState('');
  const [dtFinal, setDtFinal] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mostrarCalendarioDataInicio, setMostrarCalendarioDataInicio] = useState(false);
  const [mostrarCalendarioDataFinal, setMostrarCalendarioDataFinal] = useState(false);

  moment.locale('pt-br');

  const handleSelecionarDataInicio = (data) => {
    var date = data.toISOString().split('T')[0]
    setDtInicial(moment(date).format('L'));
    setMostrarCalendarioDataInicio(false);
  };

  const handleSelecionarDataFinal = (data) => {
    var date = data.toISOString().split('T')[0]
    setDtFinal(moment(date).format('L'));
    setMostrarCalendarioDataFinal(false);
  };

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
        alert('Viagem atualizada com sucesso');
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
        titleText={'Atualize a data final'}
        value={destinoUser}
        onChangeText={setDestinoUser}
      />
      <ContainerInput
        titleText={'Atualize a data inicial'}
        value={dtInicial}
        onChangeText={setDtInicial}
        onFocus={() => setMostrarCalendarioDataInicio(true)}
      />
      <ContainerInput
        titleText={'Atualize a data final'}
        value={dtFinal}
        onChangeText={setDtFinal}
        onFocus={() => setMostrarCalendarioDataFinal(true)}
      />
      <View style={styles.containerButtons}>
        <Button textButton={'SALVAR'} color="#F5BD60" onpress={salvarDados}/>
      </View>

      <DateTimePickerModal
        isVisible={mostrarCalendarioDataInicio}
        mode="date"
        locale="pt_BR" 
        onConfirm={handleSelecionarDataInicio}
        onCancel={() => setMostrarCalendarioDataInicio(false)}
      />
      <DateTimePickerModal
        isVisible={mostrarCalendarioDataFinal}
        mode="date"
        locale="pt_BR" 
        onConfirm={handleSelecionarDataFinal}
        onCancel={() => setMostrarCalendarioDataFinal(false)}
      />
    </Background>
  );
};

export default Atualizar_viagem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#75B1FA',
    justifyContent: 'space-evenly',
  },
  containerButtons: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});