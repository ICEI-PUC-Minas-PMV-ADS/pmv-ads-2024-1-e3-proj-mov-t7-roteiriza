import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput} from 'react-native';
import { useRoute } from '@react-navigation/native';

import  Header  from '../components/Header'
import ContainerPasseios from '../components/containerPasseios'
import Button from '../components/buttonAdicionar';
import DropdownHour from '../components/dropdownHour';
import DropdownTransport from '../components/dropdownTransport';
import InputMenor from '../components/inputMenor';
import InputNormal from '../components/inputPadrao';

//firebase
import { collection, addDoc, query, where, getDoc, getDocs, updateDoc, doc } from '@firebase/firestore';
import { firestore } from '../firebase/config';

//Calendario
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment/locale/pt-br';


const Passeios = ({userId}) => {

    const route = useRoute();
    const { viagemId, passeioId } = route.params;


    //Dropdown
    const [isActiveHour, setIsActiveHour] = useState(false);
    const [isActiveTransport, setIsActiveTransport] = useState(false);

    const options = ['Taxi', 'Ônibus', 'Carro']
    const optionsHour = ['Manhã', 'Tarde', 'Noite']


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
    const [documentId, setDocumentId] = useState(passeioId);

    //calendario
    const [mostrarCalendarioData, setMostrarCalendarioData] = useState(false);

      moment.locale('pt-br');

    // Função para lidar com a seleção da data
    const handleSelecionarData = (data) => {
        var date = data.toISOString().split('T')[0];
        setData(moment(date).format('L'));
        setMostrarCalendarioData(false);
    };

    useEffect(() => {
        if (!isLoaded) {
            loadPasseio();
        }                    
      }, [isLoaded, passeioId]);

    //Função para carregar os dados ao entrar na tela
    const loadPasseio = async () => {
        if (!isLoaded) {
            try {
    
              const docRef = doc(firestore, 'passeios', passeioId);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                  const docData = docSnap.data();

                  setData(docData.Data);
                  setEndereco(docData.Endereco);
                  setLocal(docData.Local);
                  setValor(docData.Valor);

                  setTransporte(docData.Transporte);
                  setSelectedTransport(docData.Transporte);

                  setHorario(docData.Horario);
                  setSelectedHour(docData.Horario);

                  setIsLoaded(true);
                  setDadoOnStore(true);

                  
              } else {
                console.log('Sem passeios cadastradas');
              }
            } catch (error) {
              console.log('Ocorreu um erro: ', error);
            }
          } else {
            console.log('Os dados já foram carregados');
          }
    };

    //Função para criar um passeio ou editar um passeio já existente
    const savePasseio = async () => {
        const passeioRef = collection(firestore, 'passeios');

        if (local && endereco && data && horario && transporte && valor) {

          const valorNumerico = parseFloat(valor.replace(',', '.')); 

          if (isNaN(valorNumerico)) {
            alert('Erro!', ' O valor informado não é um número válido');
            return;
          }

          const dadosPasseio = {
            Local: local,
            Endereco: endereco,
            Data: data,
            Horario: horario,          
            Transporte: transporte,
            Valor: valorNumerico,
            userId: userId,
            viagemId: viagemId,
          };
    
          
          try {
    
            if(dadoOnStore == false){
              await addDoc(passeioRef, dadosPasseio);
             
              alert('Cadastro de passeio realizado com sucesso!');
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
    
              alert('Edições salvas com sucesso!')
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
           
        <View style={styles.containerPai}>
            <View>               
                <View style={styles.container}>
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
                            {/* AQUI */}
                            <View style={styles.boxTransporte}>
                            <Text style={styles.textInput}>Transporte</Text>

                            <TouchableOpacity ClassName='dropdown' 
                                style={styles.inputMenor}
                                onPress= {e => setIsActiveTransport(!isActiveTransport)}
                            >

                            <TouchableOpacity ClassName='dropdown-btn'>
                                <Text 
                                    onPress= {e => setIsActiveTransport(!isActiveTransport)}
                                    style={[styles.placeholder, selectedTransport !== valor && styles.selectedValue]

                                }
                                > 
                                {selectedTransport ? selectedTransport : "Carro"}

                                </Text>
                                </TouchableOpacity>

                                {isActiveTransport && (
                                    <View ClassName='dropdown-content' style={styles.dropdownContent}>
                                        {options.map(option => (
                                        <TouchableOpacity 
                                            key={option}
                                            ClassName='dropdown-item'
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                            setSelectedTransport(option);
                                            setTransporte(option);  // Armazena o valor selecionado na variável 'transporte'
                                            setIsActiveTransport(false);
                                            }}
                                            
                                            >
                                            <Text>{option}</Text>
                                        </TouchableOpacity>
                                        ))}

                                    </View>
                                )}
                                
                            </TouchableOpacity>
                                
                            <TouchableOpacity
                                onPress= {e => setIsActiveTransport(!isActiveTransport)}
                                >
                                <Image source={require('../assets/img/dropdown.png')} style={styles.iconRight} />
                            </TouchableOpacity>
                                
                            </View>
                            

                            <View style={styles.boxHour}>
                                <Text style={styles.textInput}>Horário</Text>

                                <TouchableOpacity ClassName='dropdown' 
                                    style={styles.inputMenor}
                                    onPress= {e => setIsActiveHour(!isActiveHour)}
                                >

                                <TouchableOpacity ClassName='dropdown-btn'>
                                    <Text 
                                        onPress= {() => setIsActiveHour(!isActiveHour)}
                                        style={[styles.placeholder, selectedHour !== valor && styles.selectedValue]}
                                        > 
                                        {selectedHour ? selectedHour : "Manhã"}

                                    </Text>
                                </TouchableOpacity>

                                {isActiveHour && (
                                    <View ClassName='dropdown-content' style={styles.dropdownContent}>
                                        {optionsHour.map(optionHour => (
                                        <TouchableOpacity 
                                            key={optionHour}
                                            ClassName='dropdown-item'
                                            style={styles.dropdownItem}
                                            onPress={ () => {
                                                setSelectedHour(optionHour)
                                                setHorario(optionHour)
                                                setIsActiveHour(false)}
                                            }
                                            >
                                            <Text>{optionHour}</Text>
                                        </TouchableOpacity>
                                        ))}

                                    </View>
                                )}
                                
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                onPress= {() => setIsActiveHour(!isActiveHour)}
                                >
                                <Image source={require('../assets/img/dropdown.png')} style={styles.iconRight} />
                                </TouchableOpacity>
                                
                            </View>
                        </View>

                        <View style={styles.inputbox}>
                            <View style={styles.input}>
                            <TouchableWithoutFeedback onPress={() => setMostrarCalendarioData(true)}>
                                <View>
                                    <Text style={styles.textInput}>Data saída</Text>
                                    <TextInput
                                        keyboardType='date'
                                        style={styles.inputMenor}
                                        placeholder={'10/05/2024'}
                                        placeholderTextColor={'#B5B3B3'}
                                        value={data}
                                        onChangeText={setData}
                                        onFocus={() => setMostrarCalendarioData(true)}
                                        
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                                <Image source={require('../assets/img/calendar.png')} style={styles.iconLeft}/>
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
                    
                    
                    <View>
                        <Button 
                            textButton={"SALVAR"} 
                            color='#F5BD60' 
                            fontColor='#FFFFFF'
                            onpress={savePasseio}
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

    </View>

    );

}

export default Passeios;

const styles = StyleSheet.create({
    boxPasseios: {
        alignItems: 'center',
        margin: 25,
        marginTop: -12,
        marginBottom: -5,
        height: 'auto',
    },
    boxHour: {
        position: 'relative',
        zIndex: 1
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
        gap: 25,
    },
    dropdownContainer: {
        position: 'relative',
        zIndex: 1,
    },
    img: {
        marginBottom: 10,
        marginTop: 10,
    },
   container: {
      alignItems: 'center',
      height: '100%',
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
    input: {
        zIndex: 0,
        position:'relative'
    }
    
})