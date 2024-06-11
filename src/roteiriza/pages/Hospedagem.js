import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useRoute } from '@react-navigation/native';
import { formatDistance } from 'date-fns';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from '@firebase/firestore';
import { firestore } from '../firebase/config';

import moment from 'moment';
import 'moment/locale/pt-br';

import Button from '../components/buttonAdicionar';
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

  moment.locale('pt-br');
  
  // Função para lidar com a seleção da data de início
  const handleSelecionarDataInicio = (data) => {
    var date = data.toISOString().split('T')[0]
    setCheckIn(moment(date).format('L'));
    setMostrarCalendarioDataInicio(false);
  };

  // Função para lidar com a seleção da data final
  const handleSelecionarDataFinal = (data) => {
    var date = data.toISOString().split('T')[0];

    setCheckOut(moment(date).format('L'));
    setMostrarCalendarioDataFinal(false);
  };

  useEffect(() => {
    loadHospedagem();
  }, [isLoaded, viagemId]);

  useEffect(() => {
    if (checkIn && checkOut) {
      try {   
        
        let periodo = calcularPeriodo(checkIn, checkOut);
        setDias(periodo);
          
      } catch (error) {
          console.log('Ocorreu um erro: ', error);
      }
    }
  } , [checkIn, checkOut]);


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

  const calcularPeriodo = (dataInicial, dataFinal) => {

    const convertToDate = (dateStr) => {
      const [day, month, year] = dateStr.split('/');
      return new Date(`${year}-${month}-${day}`);
    };

    const startDate = convertToDate(dataInicial);
    const finalDate = convertToDate(dataFinal);

    let resultado = formatDistance(startDate, finalDate);
    let resultadoFormatado = resultado.replace('days', 'dias').replace('day', 'dia');
    return resultadoFormatado;
  }

  const cancelHospedagem = () => {
    alert('Cancel');
  };
  

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/imgHospedagem.png')} />

      <View style={styles.box}>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Endereço do local</Text>
          <TextInput
            value={local}
            onChangeText={setLocal}
            placeholder="Endereço"
            autoCapitalize="none"
            style={styles.inputMaior}
          />
          <Image source={require('../assets/img/adressIcon.png')} style={styles.icon}/>

        </View>

        <View style={styles.subBox}>
          <View style={styles.line}>
            <View style={styles.inputHalf}>
              <Text style={styles.text}>Data de Check-In</Text>
              <TextInput
                value={checkIn}
                onChangeText={setCheckIn}
                placeholder=""
                autoCapitalize="none"
                style={styles.inputMenor}
                onFocus={() => setMostrarCalendarioDataInicio(true)}
              />
              <Image source={require('../assets/img/calendar.png')} style={styles.iconLeft}/>
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.text}>Data de Check-Out</Text>
              <TextInput
                value={checkOut}
                onChangeText={setCheckOut}
                placeholder=""
                autoCapitalize="none"
                style={styles.inputMenor}
                onFocus={() => setMostrarCalendarioDataFinal(true)}
              />
              <Image source={require('../assets/img/calendar.png')} style={styles.iconLeft}/>
            </View>
          </View>

          <View style={styles.line}>
            <View style={styles.inputHalf}>
              <Text style={styles.text}>Dias</Text>
              <TextInput
                value={dias}
                onChangeText={setDias}
                placeholder=""
                autoCapitalize="none"
                style={styles.inputMenor}
              />
              <Image source={require('../assets/dia.png')} style={styles.iconLeft}/>
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.text}>Valor a ser gasto</Text>
              <TextInput
                value={valor}
                onChangeText={setValor}
                placeholder=""
                autoCapitalize="none"
                style={styles.inputMenor}
              />
              <Image source={require('../assets/img/moneyIcon.png')} style={styles.iconLeftMoney}/>
            </View>
          </View>

          <View style={styles.buttonBox}>
            <Button 
              textButton={"ADICIONAR"} 
              color='#F5BD60' 
              fontColor='#FFFFFF'
              onpress={saveHospedagem}
            />

            <Button 
              textButton={"CANCELAR"} 
              color='#FFFFFF' 
              fontColor='#181818' 
              borderColor={'black'} 
              borderWidth={2}
              onpress={cancelHospedagem}
            />
          </View>

          {/*
            <View style={styles.botaoContainer}>
            <TouchableOpacity style={styles.btn1} onPress={saveHospedagem}>
              <Text style={[styles.text, { color: '#FFFFFF' }]}>SALVAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn2} onPress={cancelHospedagem}>
              <Text style={styles.text}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
           */}
          

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
        </View>
        
      </View>

      
  );
};

export default Hospedagem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 0
  },
  box : {
    alignItems: 'center',

  },
  icon: {
    width: 21,
    height: 21,
    bottom: 28,
    right: -6
  },
  buttonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
},
  subBox: {
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    height: 65,
    marginBottom: 10,
  },
  iconLeft: {
    width: 21,
    height: 21,
    bottom: 28,
    left: 9
  },
  iconLeftMoney : {
    width: 21,
    height: 21,
    bottom: 28,
    left: 9
},
  line: {
    flexDirection: 'row',
    height: 75,
    gap: 25,
    marginBottom: 10,
  },
  inputHalf: {
    marginTop: 0,
  },
  logo: {
    height: 300,
    width: 280,
    marginBottom: 20,
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
  inputMaior: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    paddingStart: 30,
    borderWidth: 1,
    borderColor: '#CACACA',
    width: 283,
    height: 35, 
    fontSize: 14
  },
  inputMenor: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    paddingStart: 35,
    borderWidth: 1,
    borderColor: '#CACACA',
    width: 130,
    height: 35, 
    fontSize: 14
  },

  text: {
    color: '#063A7A',
    fontWeight: 'bold',
    fontSize: 15
  },
});
