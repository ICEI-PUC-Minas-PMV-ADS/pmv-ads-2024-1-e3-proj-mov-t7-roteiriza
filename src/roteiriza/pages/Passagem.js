import React from 'react';
import { useState } from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import  Header  from '../components/Header';
import InputMenor from '../components/inputMenor';
import InputCounter from '../components/inputCounter'
import Button from '../components/buttonAdicionar';
import DropdownTransport from '../components/dropdownTransport';

import { collection, addDoc, query, where, getDocs, updateDoc, doc } from '@firebase/firestore';
import { firestore } from '../firebase/config';

import DateTimePickerModal from 'react-native-modal-datetime-picker';


const Passagem = () =>{
  const [selected, setSelected] = useState("")

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
  const [dadoOnStore, setDadoOnStore ] = useState(false);

  
  //Calendario
  const [mostrarCalendarioDataSaida, setMostrarCalendarioDataSaida] = useState(false);
  const [mostrarCalendarioDataRetorno, setMostrarCalendarioDataRetorno] = useState(false);



  // Função para lidar com a seleção da data de início
  const handleSelecionarDataSaida = (data) => {
    setDataSaida(data.toISOString().split('T')[0]);
    setMostrarCalendarioDataSaida(false);
  };

  // Função para lidar com a seleção da data final
  const handleSelecionarDataRetorno = (data) => {
    setDataRetorno(data.toISOString().split('T')[0]);
    setMostrarCalendarioDataRetorno(false);
  }; 

  const loadPassagem = () => {

  };

  const savePassagem = async () => {
    console.log('Chamou')
    console.log(qntdMalas)
    console.log(valor)
    console.log(qntdPessoas)
    console.log(dataSaida)
    console.log(dataRetorno)
    

    const hospRef = collection(firestore, 'passagem');

    if (qntdPessoas && qntdMalas && valor && dataRetorno && dataSaida) {
      
      const dadosHosp = {
       Malas: qntdMalas,
       Valor: valor,
       Pessoas: qntdPessoas,
       DataSaida: dataSaida,
       DataRetorno: dataRetorno
      };

   

        if(dadoOnStore == false){
          await addDoc(hospRef, dadosHosp);
          alert('Cadastro de hospedagem realizado com sucesso!');
        }
        else{
          console.log('Ocorreu um erro ao salvar dados')
        }
       
     
    } else {
      alert('Preencha os campos corretamente!');
    }
  };

  const cancelPassagem = () => {

    alert('Cancel');
  };


  return(

    <View>
      <Header title="Passagem"/>

      <View style={styles.container}>
        <Image source={require('../assets/img/passagemImg.png')} style={styles.img}/>

        <View style={styles.content}>
          <View style={styles.inputbox}>
            <View style={styles.input}>

              <InputMenor
              nome={'Data de Saída'} 
              valor={'15/01/2024'}
              value={dataSaida}
              onChangeText={setDataSaida}
              onFocus={() => setMostrarCalendarioDataSaida(true) }
              />

              <Image source={require('../assets/img/calendar.png')} style={styles.iconLeft}/>
            </View>

            <View>

              <InputMenor
              nome={'Data de Retorno'} 
              valor={'22/01/2024'}
              value={dataRetorno}
              onChangeText={setDataRetorno}
              onFocus={() => setMostrarCalendarioDataRetorno(true) }
              />

              <Image source={require('../assets/img/calendar.png')} style={styles.iconRight}/>
            </View>
          </View>

          <View style={styles.inputbox}>
            <View style={styles.input}>

              <InputCounter 
                style={styles.numberInput}
                nome={'Pessoas'} 
                valor={'2'}
                value={qntdPessoas}
                onChangeText={setQntdPessoas}
              />

              <View styles={styles.count}>
                <Image source={require('../assets/img/menos.png')} style={styles.iconLeft}/>
                <Image source={require('../assets/img/adicao.png')} style={styles.iconDoubleRight}/>
              </View>
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
                        key={option}
                        ClassName='dropdown-item'
                        style={styles.dropdownItem}
                          onPress={ e => {setSelected(option)
                          setIsActive(false)}
                          }
                        
                        >
                        <Text>{option}</Text>
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

              <InputCounter 
                style={styles.numberInput}
                nome={'Malas'} 
                valor={'2'}
                value={qntdMalas}
                onChangeText={setQntdMalas}
              />

              <View styles={styles.count}>
                <Image source={require('../assets/img/menos.png')} style={styles.iconLeft}/>
                <Image source={require('../assets/img/adicao.png')} style={styles.iconDoubleRight}/>
              </View>
            </View>

            <View style={styles.inputCost} >
              <InputMenor
                nome={'Valor a ser gasto'} 
                valor={'870,00'}
                value={valor}
                onChangeText={setValor}
              />

              <Image source={require('../assets/img/moneyIcon.png')} style={styles.iconRight}/>
            </View>

          </View>    
        </View>
        

        <View style={styles.buttonBox}>
          <Button 
            textButton={"SALVAR"} 
            color='#F5BD60' 
            fontColor='#FFFFFF'
            onpress={savePassagem}
          />

         <Button 
            textButton={"CANCELAR"} 
            color='#FFFFFF' 
            fontColor='#181818' 
            borderColor={'black'} 
            borderWidth={2}
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
        marginTop: 10,
    },
  container: {
      alignItems: 'center',

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
        gap: 25
    },
  inputboxLast : {
        flexDirection: 'row',
        gap: 25,
        bottom: 20
    },
  buttonBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        bottom: 10,
        top: 10
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
      paddingBottom: 2
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
      paddingBottom: 2,
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
})