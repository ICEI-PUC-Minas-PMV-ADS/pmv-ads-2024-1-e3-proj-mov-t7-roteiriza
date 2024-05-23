import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Text, View, Image, ScrollView, StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';

import  Header  from '../components/Header'
import ContainerPasseios from '../components/containerPasseios'
import Button from '../components/buttonAdicionar';
import DropdownHour from '../components/dropdownHour';
import DropdownTransport from '../components/dropdownTransport';
import InputMenor from '../components/inputMenor';
import InputNormal from '../components/inputPadrao';

//firebase
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from '@firebase/firestore';
import { firestore } from '../firebase/config';

//Calendario
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const Passeios = ({userId}) => {

    const route = useRoute();
    const { viagemId, passeioId } = route.params;

    const [selectedHour, setSelectedHour] = useState("");
    const [selectedTransport, setSelectedTransport] = useState("");

    //Dados
    const [local, setLocal] = useState("")
    const [endereco, setEndereco] = useState("")
    const [data, setData] = useState("")
    const [horario, setHorario] = useState("")
    const [transporte, setTransporte] = useState("")
    const [valor, setValor] = useState("")

  const [isLoaded, setIsLoaded] = useState(false);
  const [dadoOnStore, setDadoOnStore ] = useState(false);
  const [documentId, setDocumentId] = useState('');

    //calendario
    const [mostrarCalendarioData, setMostrarCalendarioData] = useState(false);


    // Função para lidar com a seleção da data
    const handleSelecionarData = (data) => {
        setDataSaida(data.toISOString().split('T')[0]);
        setMostrarCalendarioDataSaida(false);
    };

    useEffect(() => {
        if (!isLoaded) {
            loadPasseio();
        }
      }, [isLoaded, passeioId]);


    const loadPasseio = async () => {
        if (!isLoaded) {
            try {
              console.log('Chamou')

              console.log(local);
              console.log(endereco);
              console.log(data);
              console.log(horario);
              console.log(valor);
              console.log(transporte);


              const passeiosCollectionRef = collection(firestore, 'passeio');
              const q = query(passeiosCollectionRef, where('passeioId', '==', passeioId));
              const querySnapshot = await getDocs(q);
      
              if (!querySnapshot.empty) {
                const docSnapshot = querySnapshot.docs[0];
                const doc = querySnapshot.docs[0].data();
      
                setLocal(doc.Local);
                setEndereco(doc.Endereco);
                setData(doc.Data);
                setHorario(doc.Horario);
                setValor(doc.Valor);
      
                setTransporte(doc.Transporte);
                setSelected(doc.Transporte)
      
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

    const savePasseio = async () => {
        console.log('chamada')
        const passeioRef = collection(firestore, 'passeios');

        if (qntdPessoas && qntdMalas && valorteste && dataRetorno && dataSaida) {
          
          const dadosPasseio = {
            Local: local,
            Endereco: endereco,
            Data: data,
            Horario: horario,          
            Transporte: transporte,
            Valor: valor,
            userId: userId,
            viagemId: viagemId,
          };
    
          
          try {
            console.log(dadoOnStore)
    
            if(dadoOnStore == false){
              await addDoc(passeioRef, dadosPasseio);
              alert('Cadastro de hospedagem realizado com sucesso!');
            }
    
            if(dadoOnStore == true) {
              const docRef = doc(firestore, 'passeios', documentId);
    
    
              await updateDoc(docRef, {
                Local: local,
                Endereco: endereco,
                Data: data,
                Horario: horario,          
                Transporte: transporte,
                Valor: valor,                             
              });
    
              alert('Documento salvo com sucesso!')
            }
          }
          catch(error){
            console.log('Ocorreu um erro! ', error)
          }
         
        } else {
          alert('Preencha os campos corretamente!');
        }
      };
    
      const cancelPasseio = () => {
    
        alert('Cadastro de Passeio cancelado!');
      };


    return(
           
        <ScrollView >
            <View  style={styles.fixedElement}>
                <Header title={"Passeios"}  />
            </View>

            <View>               
                <View style={styles.container}>
                    {/*
                        <ContainerPasseios />
                     */}

            <View style={styles.boxPasseios}>    

                <Image source={require('../assets/img/imgpasseios2.png')} style={styles.img}/>

                    <InputNormal 
                        nome={'Nome do Local'} 
                        valor={'Cristo Redentor'} 
                        value={local}
                        onChangeText={setLocal}
                    />
                    <Image source={require('../assets/img/localIcon.png')} style={styles.icon}/>

                    <InputNormal 
                        nome={'Endereço do Local'} 
                        valor={'Parque Nacional da Tijuca'}
                        value={endereco}
                        onChangeText={setEndereco}
                    />   
                    <Image source={require('../assets/img/adressIcon.png')} style={styles.icon}/>

                    <View style={styles.inputbox}>
                        <View style={styles.input}>
                            <InputMenor 
                                nome={'Data'} 
                                valor={'18 de janeiro'}
                                value={data}
                                onChangeText={setData}
                                onFocus={() => setMostrarCalendarioData(true) }
                                
                            />
                            <Image source={require('../assets/img/calendar.png')} style={styles.iconLeft}/>
                        </View>

                        <View style={styles.dropdownContainer}>
                            <DropdownHour 
                                selected={selectedHour}
                                setSelected={setSelectedHour} 
                                valor={'Manhã'} 
                                nome={'Horário'}
                                value={horario}
                                onChangeText={setHorario}
                                
                            /> 
                        </View>
                    </View>

                    <View style={styles.inputbox}>
                        <View style={styles.dropdownContainer}>
                        <DropdownTransport 
                            selected={selectedTransport}
                            setSelected={setSelectedTransport}
                            valor={'Avião'} 
                            nome={'Transporte'}
                            value={transporte}
                            onChangeText={setTransporte}
                        /> 
                        </View>

                        <View style={styles.input}>
                            <InputMenor 
                                nome={'Valor a ser gasto'} 
                                valor={'160,00'}
                                value={valor}
                                onChangeText={setValor}
                            />
                            <Image source={require('../assets/img/moneyIcon.png')} style={styles.iconLeftMoney}/>
                        </View>
                    </View>
                

            </View> 
                    
                    
                    <View style={styles.buttonBox}>
                        <Button 
                            textButton={"ADICIONAR"} 
                            color='#F5BD60' 
                            fontColor='#FFFFFF'
                            onpress={savePasseio}
                        />

                        <Button 
                            textButton={"CANCELAR"} 
                            color='#FFFFFF' 
                            fontColor='#181818' 
                            borderColor={'black'} 
                            borderWidth={2}
                            onpress={cancelPasseio}
                        />
                    </View>
                </View>
            </View>

            <DateTimePickerModal
                isVisible={mostrarCalendarioData}
                mode="date"
                locale="pt_BR" 
                onConfirm={handleSelecionarData}
                onCancel={() => setMostrarCalendarioDataSaida(false)}
            />

     </ScrollView>

    );

}

export default Passeios;

const styles = StyleSheet.create({
    fixedElement: {
        zIndex: 5
    },
    buttonBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        top: -30
    },
    boxPasseios: {
        alignItems: 'center',
        margin: 25,
        marginTop: 0,
        marginBottom: 50
    },
    icon: {
        width: 21,
        height: 21,
        bottom: 28,
        right: 120
    },
    iconLeft: {
        width: 21,
        height: 21,
        bottom: 28,
        left: 12
    },
    iconLeftMoney : {
        width: 21,
        height: 21,
        bottom: 28,
        left: 12
    },
    img: {
        marginBottom: 10
    },
    inputbox: {
        flexDirection: 'row',
        gap: 25
    },
    dropdownContainer: {
        position: 'relative',
        zIndex: 1,
    }
})