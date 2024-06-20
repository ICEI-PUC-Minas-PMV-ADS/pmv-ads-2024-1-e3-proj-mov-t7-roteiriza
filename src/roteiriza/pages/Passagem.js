import React, { useState, useEffect } from 'react';

import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput} from 'react-native';
import  Header  from '../components/Header';
import InputMenor from '../components/inputMenor';
import InputCounter from '../components/inputCounter'
import Button from '../components/buttonAdicionar';
import DropdownTransport from '../components/dropdownTransport';

import { useRoute } from '@react-navigation/native';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from '@firebase/firestore';
import { firestore } from '../firebase/config';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment/locale/pt-br';


const Passagem = ({ userId }) =>{

  const route = useRoute();
  const { viagemId } = route.params;

  const [selected, setSelected] = useState('');

  //Dropdown
  const [isActive, setIsActive] = useState(false)
  const options = ['Avião', 'Ônibus', 'Carro']

  //Dados
  const [dataSaida, setDataSaida] = useState("")
  const [dataRetorno, setDataRetorno] = useState("")
  const [qntdPessoas, setQntdPessoas] = useState("")
  const [transporte, setTransporte] = useState("")
  const [qntdMalas, setQntdMalas] = useState("")
  const [valor, setValor] = useState("")

  const [valorteste, setValorTeste] = useState('');

  const [dadoOnStore, setDadoOnStore ] = useState(false);
  const [documentId, setDocumentId] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);


  
  //Calendario
  const [mostrarCalendarioDataSaida, setMostrarCalendarioDataSaida] = useState(false);
  const [mostrarCalendarioDataRetorno, setMostrarCalendarioDataRetorno] = useState(false);

  moment.locale('pt-br');


  // Função para lidar com a seleção da data de início
  const handleSelecionarDataSaida = (data) => {
    var date = data.toISOString().split('T')[0];
    setDataSaida(moment(date).format('L'));
    setMostrarCalendarioDataSaida(false);
  };

  // Função para lidar com a seleção da data final
  const handleSelecionarDataRetorno = (data) => {
    var date = data.toISOString().split('T')[0];
    setDataRetorno(moment(date).format('L'));
    setMostrarCalendarioDataRetorno(false);
  }; 

  useEffect(() => {
    if (!isLoaded) {
      loadPassagem();
    }

  }, [isLoaded, viagemId]);

  const loadPassagem = async () => {
    if (!isLoaded) {
      try {
        const passagemCollectionRef = collection(firestore, 'passagem');
        const q = query(passagemCollectionRef, where('viagemId', '==', viagemId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          const doc = querySnapshot.docs[0].data();

          setDataSaida(doc.DataSaida);
          setDataRetorno(doc.DataRetorno);
          setQntdPessoas(doc.Pessoas);
          setQntdMalas(doc.Malas);
          setValorTeste(doc.Valor);

          setTransporte(doc.Transporte);
          setSelected(doc.Transporte)

          setIsLoaded(true);
          setDocumentId(docSnapshot.id);

          setDadoOnStore(true)

        } else {
          console.log('Sem passagens cadastradas');
        }
      } catch (error) {
        console.log('Ocorreu um erro: ', error);
      }
    } else {
      console.log('Os dados já foram carregados');
    }
  };

  const savePassagem = async () => {
    const hospRef = collection(firestore, 'passagem');
  
    if (qntdPessoas && qntdMalas && valorteste && dataRetorno && dataSaida) {
    
      const dadosHosp = {
       Malas: qntdMalas,
       Valor: valorteste,
       Pessoas: qntdPessoas,
       DataSaida: dataSaida,
       DataRetorno: dataRetorno,
       Transporte: transporte,
       userId: userId,
       viagemId: viagemId
      };

      
      try {
        console.log(dadoOnStore)

        if(dadoOnStore == false){
          await addDoc(hospRef, dadosHosp);
          alert('Cadastro de Passagem realizado com sucesso!');
        }

        if(dadoOnStore == true) {
          const docRef = doc(firestore, 'passagem', documentId);


          await updateDoc(docRef, {
            Malas: qntdMalas,
            Valor: valorteste,
            Pessoas: qntdPessoas,
            DataSaida: dataSaida,
            DataRetorno: dataRetorno,
            Transporte: transporte,                 
          });

          alert('Passagem salva com sucesso!')

        }
      }
      catch(error){
        console.log('Ocorreu um erro! ', error)
      }
     
    } else {
      alert('Preencha os campos corretamente!');
    }
  };


  return(

    <View style={styles.view}>
      <View style={styles.container}>
        <Image source={require('../assets/img/passagemImg.png')} style={styles.img}/>

        <View style={styles.content}>
          <View style={styles.inputbox}>
            <View style={styles.input}>
              <TouchableWithoutFeedback onPress={() => setMostrarCalendarioDataSaida(true)}>
                <View>
                    <Text style={styles.textInput}>Data saída</Text>
                      <TextInput
                          keyboardType='date'
                          style={styles.inputMenor}
                          placeholder={'10/05/2024'}
                          placeholderTextColor={'#B5B3B3'}
                          value={dataSaida}
                          onChangeText={setDataSaida}
                          onFocus={() => setMostrarCalendarioDataSaida(true)}
                          
                      />
                  </View>
                  </TouchableWithoutFeedback>
                  <Image source={require('../assets/img/calendar.png')} style={styles.iconLeft}/>
              </View>

            <View>

              <TouchableWithoutFeedback onPress={() => setMostrarCalendarioDataRetorno(true)}>
                <View>
                  <Text style={styles.textInput}>Data saída</Text>
                    <TextInput
                        keyboardType='date'
                        style={styles.inputMenor}
                        placeholder={'10/05/2024'}
                        placeholderTextColor={'#B5B3B3'}
                        value={dataRetorno}
                        onChangeText={setDataRetorno}
                        onFocus={() => setMostrarCalendarioDataRetorno(true)}
                        
                    />
                </View>
              </TouchableWithoutFeedback>

              <Image source={require('../assets/img/calendar.png')} style={styles.iconRight}/>
            </View>
          </View>

          <View style={styles.inputbox}>
            <View style={styles.input}>

              <InputMenor 
                style={styles.numberInput}
                nome={'Pessoas'} 
                valor={'2'}
                value={qntdPessoas}
                onChangeText={setQntdPessoas}
              />

              <Image source={require('../assets/img/family.png')} style={styles.iconLeft}/>
            </View>

            {/* DROPDOWN TRANSPORTE */}           
            <View style={styles.boxTransporte}>
            <Text style={styles.textInput}>Transporte</Text>

              <TouchableOpacity ClassName='dropdown' 
                style={styles.inputMenor}
                onPress= {e => setIsActive(!isActive)}
              >

              <TouchableOpacity ClassName='dropdown-btn'>
                <Text 
                  onPress= {e => setIsActive(!isActive)}
                  style={[styles.placeholder, selected !== valor && styles.selectedValue]

                  }
                > 
                  {selected ? selected : valor}

                </Text>
              </TouchableOpacity>

              {isActive && (
                  <View ClassName='dropdown-content' style={styles.dropdownContent}>
                    {options.map(option => (
                      <TouchableOpacity 
                      style={styles.dropdownItem}
                        key={option}
                        ClassName='dropdown-item'
                        onPress={() => {
                          setSelected(option);
                          setTransporte(option);  // Armazena o valor selecionado na variável 'transporte'
                          setIsActive(false);
                        }}
                        
                        >
                        <Text style={styles.dropdownItemText}>{option}</Text>
                      </TouchableOpacity>
                    ))}

                  </View>
              )}
              
            </TouchableOpacity>
            
             <TouchableOpacity
              onPress= {e => setIsActive(!isActive)}
             >
              <Image source={require('../assets/img/dropdown.png')} style={styles.iconRight} />
             </TouchableOpacity>
            
          </View>
            

          </View>

          <View style={styles.inputboxLast}>
            <View style={styles.input}>

              <InputMenor 
                style={styles.numberInput}
                nome={'Malas'} 
                valor={'2'}
                value={qntdMalas}
                onChangeText={setQntdMalas}
              />

              <Image source={require('../assets/img/baggages.png')} style={styles.iconLeft}/>
            </View>

            <View style={styles.inputCost} >
              <InputMenor
                nome={'Valor a ser gasto'} 
                valor={'870,00'}
                value={valorteste}
                onChangeText={setValorTeste}
              />

              <Image source={require('../assets/img/moneyIcon.png')} style={styles.iconRight}/>
            </View>

          </View>    
        </View>
        

        <View>
          <Button 
            textButton={"SALVAR"} 
            color='#F5BD60' 
            fontColor='#FFFFFF'
            onpress={savePassagem}
          />
        </View>


      </View>  

      <DateTimePickerModal
        isVisible={mostrarCalendarioDataSaida}
        mode="date"
        locale="pt_BR" 
        onConfirm={handleSelecionarDataSaida}
        onCancel={() => setMostrarCalendarioDataSaida(false)}
      />

      <DateTimePickerModal
        isVisible={mostrarCalendarioDataRetorno}
        mode="date"
        locale="pt_BR" 
        onConfirm={handleSelecionarDataRetorno}
        onCancel={() => setMostrarCalendarioDataRetorno(false)}
      />

      

    </View>
    
  )
}

export default Passagem;

const styles = StyleSheet.create({
  img: {
        marginBottom: 10,
        marginTop: 10
    },
  container: {
      alignItems: 'center',
      paddingBottom: 40,
      paddingTop: 10
  },
  dropdownContainer: {
        position: 'relative',
        zIndex: 1,
  },
  iconLeft: {
        width: 21,
        height: 21,
        bottom: 28,
        left: 9
    },
  iconLeftBag: {
    width: 28,
    height: 21,
    bottom: 28,
    left: 9
  },
  iconRight: {
    width: 21,
    height: 21,
    bottom: 30,
    left: 9
},
  iconDoubleRight: {
    width: 21,
    height: 21,
    bottom: 50,
    left: 100,
    },
  inputbox: {
    flexDirection: 'row',
    gap: 25,
  },
  inputboxLast : {
    flexDirection: 'row',
    gap: 25,
    marginBottom: 10,
    top: 1
  },
  content: {
    marginTop: 10
  },
  count: {
    flex: 1,
    flexDirection: 'row'
  },
  inputCost: {
    zIndex: 0,
    position:'relative'
  },
  boxTransporte:{
    position: 'relative',
    zIndex: 1
  },
  inputMenor: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 7,
    paddingStart: 34,
    borderWidth: 1,
    borderColor: '#CACACA',
    width: 130,
    height: 35, 
    fontSize: 14,
    userSelect: 'none',
       
  },   
  textInput: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#063A7A',
    paddingBottom: 0
  },
  iconRight: {
    width: 21,
    height: 21,
    bottom: 30,
    left: 9
  },
  dropdownContent :{
    position: 'absolute',
    top: 40,
    paddingTop: 2,
    paddingStart: 30,
    paddingBottom: 4,
    backgroundColor: '#ffff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#CACACA',
    width: 130,
    height: 'auto', 
    fontSize: 14,
    zIndex: 1
  },
  dropdownItem: {
    paddingBottom: 10,
    paddingTop: 5,

  },
  placeholder: {
    color: '#CACACA', 
  },
  selectedValue: {
    color: '#181818'
  },
  inputMenor: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 6,
    paddingStart: 34,
    borderWidth: 1,
    borderColor: '#CACACA',
    width: 130,
    height: 35, 
    fontSize: 14
 
  },
  
  textInput: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#063A7A',
    paddingBottom: 2
  }
})