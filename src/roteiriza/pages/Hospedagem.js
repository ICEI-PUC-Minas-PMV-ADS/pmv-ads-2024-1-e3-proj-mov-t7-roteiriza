import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useRoute } from '@react-navigation/native';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from '@firebase/firestore';
import { firestore } from '../firebase/config';

import Typography from '../components/Typography';

const Hospedagem = ({ user, handleAuthentication, userId }) => {
  const route = useRoute();
  const { viagemId } = route.params;

  const [local, setLocal] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [dias, setDias] = useState('');
  const [valor, setValor] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [dadoOnStore, setDadoOnStore ] = useState(false);
  const [documentId, setDocumentId] = useState('');


  const [mostrarCalendarioDataInicio, setMostrarCalendarioDataInicio] = useState(false);
  const [mostrarCalendarioDataFinal, setMostrarCalendarioDataFinal] = useState(false);

  // Função para lidar com a seleção da data de início
  const handleSelecionarDataInicio = (data) => {
    setCheckIn(data.toISOString().split('T')[0]);
    setMostrarCalendarioDataInicio(false);
  };

  // Função para lidar com a seleção da data final
  const handleSelecionarDataFinal = (data) => {
    setCheckOut(data.toISOString().split('T')[0]);
    setMostrarCalendarioDataFinal(false);
  };

  useEffect(() => {
    if (!isLoaded) {
      loadHospedagem();
    }
  }, [isLoaded, viagemId]);

  const loadHospedagem = async () => {
    if (!isLoaded) {
      try {
        const hospedagemCollectionRef = collection(firestore, 'hospedagem');
        const q = query(hospedagemCollectionRef, where('viagemId', '==', viagemId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          const doc = querySnapshot.docs[0].data();

          setLocal(doc.Endereco);
          setCheckIn(doc.Dt_checkIn);
          setCheckOut(doc.Dt_checkOut);
          setDias(doc.Dias);
          setValor(doc.Valor);
          setIsLoaded(true);
          setDocumentId(docSnapshot.id);


          setDadoOnStore(true)

        } else {
          console.log('Sem hospedagens cadastradas');
        }
      } catch (error) {
        console.log('Ocorreu um erro: ', error);
      }
    } else {
      console.log('Os dados já foram carregados');
    }
  };

  const saveHospedagem = async () => {

    const hospRef = collection(firestore, 'hospedagem');

    if (local && checkIn && checkOut && dias && valor) {
      let dadosHosp = {
        Endereco: local,
        Dt_checkIn: checkIn,
        Dt_checkOut: checkOut,
        Dias: dias,
        Valor: valor,
        userId: userId,
        viagemId: viagemId
      };

      try {
        console.log(dadoOnStore)
        
        if(dadoOnStore == false){
          await addDoc(hospRef, dadosHosp);
          alert('Cadastro de hospedagem realizado com sucesso!');
        }
        if(dadoOnStore == true) {
           
          const docRef = doc(firestore, 'hospedagem', documentId);

          await updateDoc(docRef, {
            Endereco: local,
            Dt_checkIn: checkIn,
            Dt_checkOut: checkOut,
            Dias: dias,
            Valor: valor,          
          });

        }

      } catch (error) {
        console.log("Ocorreu um erro ao salvar no banco de dados!", error);
        alert("Ocorreu um erro ao salvar!");
      }
    } else {
      alert('Preencha os campos corretamente!');
    }
  };

  const cancelHospedagem = () => {
    alert('Cancel');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/imgHospedagem.png')} />

      <View style={styles.inputContainer}>
        <Text style={styles.text}>Endereço do local</Text>
        <TextInput
          value={local}
          onChangeText={setLocal}
          placeholder="Endereço"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      <View style={styles.line}>
        <View style={styles.inputHalf}>
          <Text style={styles.text}>Data de Check-In:</Text>
          <TextInput
            value={checkIn}
            onChangeText={setCheckIn}
            placeholder=""
            autoCapitalize="none"
            style={styles.input}
            onFocus={() => setMostrarCalendarioDataInicio(true)}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.text}>Data de Check-Out:</Text>
          <TextInput
            value={checkOut}
            onChangeText={setCheckOut}
            placeholder=""
            autoCapitalize="none"
            style={styles.input}
            onFocus={() => setMostrarCalendarioDataFinal(true)}
          />
        </View>
      </View>

      <View style={styles.line}>
        <View style={styles.inputHalf}>
          <Text style={styles.text}>Dias:</Text>
          <TextInput
            value={dias}
            onChangeText={setDias}
            placeholder=""
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.text}>Valor a ser gasto:</Text>
          <TextInput
            value={valor}
            onChangeText={setValor}
            placeholder=""
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.botaoContainer}>
        <TouchableOpacity style={styles.btn1} onPress={saveHospedagem}>
          <Text style={[styles.text, { color: '#FFFFFF' }]}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn2} onPress={cancelHospedagem}>
          <Text style={styles.text}>Cancelar</Text>
        </TouchableOpacity>
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
    </View>
  );
};

export default Hospedagem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20
  },
  inputContainer: {
    width: '90%',
    height: 65,
    marginBottom: 10,
  },
  line: {
    flexDirection: 'row',
    width: '90%',
    height: 75,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputHalf: {
    width: '45%',
    marginTop: 15
  },
  logo: {
    height: 300,
    width: 280,
    marginBottom: 40,
    marginTop: 30,
    borderRadius: 7,
  },
  btn1: {
    width: 160,
    height: 50,
    backgroundColor: '#F5BD60',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn2: {
    width: 160,
    height: 50,
    backgroundColor: '#FCFCFE',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, 
    borderColor: '#696969', 
  },

  botaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    marginTop: 20
  },

  input: {
    flex: 1,
    height: 30,
    borderColor: '#063A7A',
    borderWidth: 1,
    padding: 4,
    borderRadius: 10,
  },

  text: {
    color: '#063A7A',
    fontWeight: 'bold',
  },
});
