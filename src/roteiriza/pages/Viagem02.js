import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { app, firestore } from '../firebase/config';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { collection, addDoc, query, where, getDocs} from '@firebase/firestore';
import moment from 'moment';
import 'moment/locale/pt-br';

const Viagem02 = ({ userId }) => {

  const [destino, setDestino] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [mostrarCalendarioDataInicio, setMostrarCalendarioDataInicio] = useState(false);
  const [mostrarCalendarioDataFinal, setMostrarCalendarioDataFinal] = useState(false);
  const [idDoUsuario, setidDoUsuario] = useState('');
  const [mensagem, setMensagem] = useState('');

  moment.locale('pt-br');

  const handleSelecionarDataInicio = (data) => {
    var date = data.toISOString().split('T')[0]
    setDataInicio(moment(date).format('L'));
    setMostrarCalendarioDataInicio(false);
  };

  const handleSelecionarDataFinal = (data) => {
    var date = data.toISOString().split('T')[0]
    setDataFinal(moment(date).format('L'));
    setMostrarCalendarioDataFinal(false);
  };

  const handleCancelar = () => {
    setDestino('');
    setDataInicio('');
    setDataFinal('');
    setMensagem('');
  };

  const handleAdicionar = () => {
    const userRef = collection(firestore, 'viagem'); 

    if (destino !== '' && dataInicio !== '' && dataFinal !== '') {
      let indexImg = selectRandomImage();
      console.log(indexImg)

      let viagem = {
        Destino_Viagem:destino,
        DataInicio_Viagem:dataInicio,
        DataFinal_Viagem:dataFinal,
        userId: userId,
        img: indexImg
  
      }

        addDoc(userRef,viagem) 
          setMensagem('Parabéns! Viagem roteirizada com sucesso!');

    } else {
      setMensagem('Por favor, preencha todos os campos');
    }
  };

  const images = [
    require('../assets/imgRandom/Viagem-01.png'),
    require('../assets/imgRandom/Viagem-02.png')
  ];

  const selectRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return randomIndex;
  };

  return (
    <LinearGradient
      colors={['#75B1FA', '#063A7A']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.titulo}>Roteirize sua viagem</Text>
        <Text style={styles.subTitulo}>Adicione informações sobre o seu roteiro, hospedagem, alimentação, organização da mala e muito mais.</Text>

        <View style={styles.infoContainer}>
          <View style={styles.inputContainer}>
            <Text style={[styles.infoTitulo, styles.inputTitulo]}>Destino da Viagem:</Text>
            <View style={styles.inputWithIcon}>
              <MaterialIcons name="place" size={24} color="#D3D3D3" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Digite o destino da viagem..."
                placeholderTextColor="#D3D3D3" 
                value={destino}
                onChangeText={setDestino}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.infoTitulo, styles.inputTitulo]}>Data de Início da Viagem:</Text>
            <TouchableWithoutFeedback onPress={() => setMostrarCalendarioDataInicio(true)}>
              <View style={styles.inputWithIcon}>
                <MaterialIcons name="event" size={24} color="#D3D3D3" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Selecione a data de início..."
                  placeholderTextColor="#D3D3D3"
                  value={dataInicio}
                  onFocus={() => setMostrarCalendarioDataInicio(true)}
                  editable={false}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.infoTitulo, styles.inputTitulo]}>Data Final da Viagem:</Text>
            <TouchableWithoutFeedback onPress={() => setMostrarCalendarioDataFinal(true)}>
              <View style={styles.inputWithIcon}>
                <MaterialIcons name="event" size={24} color="#D3D3D3" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Selecione a data final..."
                  placeholderTextColor="#D3D3D3" 
                  value={dataFinal}
                  onFocus={() => setMostrarCalendarioDataFinal(true)}
                  editable={false}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.botoesContainer}>
            <TouchableOpacity
              style={styles.botaoAdicionar}
              onPress={handleAdicionar}
            >
              <Text style={styles.botaoTexto}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={handleCancelar}
            >
              <Text style={styles.botaoTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>

          {mensagem !== '' && <Text style={styles.mensagem}>{mensagem}</Text>}
        </View>
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
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '90%',
    maxWidth: 600,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  subTitulo: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  infoContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  infoTitulo: {
    fontSize: 20,
    marginBottom: 5,
    color: 'white',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
    flex: 1,
  },
  inputTitulo: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 5,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  botaoCancelar: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#75B1FA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  botaoAdicionar: {
    backgroundColor: '#F5BD60',
    borderWidth: 1,
    borderColor: '#F5BD60',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  botaoTexto: {
    color: 'white',
    fontSize: 18,
  },
  mensagem: {
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
    fontSize: 18,
  },
});

export default Viagem02;