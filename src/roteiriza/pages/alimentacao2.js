import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Header from '../components/Header';
import ContainerAlimentacao from '../components/ContainerAlimentacao'; 
import Button from '../components/buttonAdicionar';
import InputMenor from '../components/inputMenor';
import InputNormal from '../components/inputPadrao';

// Firebase
import { collection, addDoc, getDoc, updateDoc, doc } from '@firebase/firestore';
import { firestore } from '../firebase/config';

// Calendario
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Alimentacao = ({ userId }) => {
    const route = useRoute();
    const { viagemId, alimentacaoId } = route.params; 

    // Dropdown
    const [isActiveHour, setIsActiveHour] = useState(false);
    const optionsHour = ['Café da manhã', 'Almoço', 'Jantar'];

    const [selectedHour, setSelectedHour] = useState("");

    // Dados
    const [local, setLocal] = useState("");
    const [endereco, setEndereco] = useState("");
    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");
    const [valor, setValor] = useState("");

    const [isLoaded, setIsLoaded] = useState(false);
    const [dadoOnStore, setDadoOnStore] = useState(false);
    const [documentId, setDocumentId] = useState(alimentacaoId);

    // Calendario
    const [mostrarCalendarioData, setMostrarCalendarioData] = useState(false);

    // Função para lidar com a seleção da data
    const handleSelecionarData = (data) => {
        setData(data.toISOString().split('T')[0]);
        setMostrarCalendarioData(false);
    };

    useEffect(() => {
        if (!isLoaded) {
            loadAlimentacao();
        }
    }, [isLoaded, alimentacaoId]);

    // Função para carregar os dados ao entrar na tela
    const loadAlimentacao = async () => {
        if (!isLoaded) {
            try {
                const docRef = doc(firestore, 'alimentacao', alimentacaoId); // Renomeado para alimentacao
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const docData = docSnap.data();

                    setData(docData.Data);
                    setEndereco(docData.Endereco);
                    setLocal(docData.Local);
                    setValor(docData.Valor);

                    setHorario(docData.Horario);
                    setSelectedHour(docData.Horario);

                    setIsLoaded(true);
                    setDadoOnStore(true);
                } else {
                    console.log('Sem alimentação cadastrada');
                }
            } catch (error) {
                console.log('Ocorreu um erro: ', error);
            }
        } else {
            console.log('Os dados já foram carregados');
        }
    };

    // Função para criar uma alimentação ou editar uma alimentação já existente
    const saveAlimentacao = async () => {
        const alimentacaoRef = collection(firestore, 'alimentacao');

        if (local && endereco && data && horario && valor) {

            const valorNumerico = parseFloat(valor.replace(',', '.'));

            if (isNaN(valorNumerico)) {
                alert('Erro!', ' O valor informado não é um número válido');
                return;
            }

            const dadosAlimentacao = {
                Local: local,
                Endereco: endereco,
                Data: data,
                Horario: horario,
                Valor: valorNumerico,
                userId: userId,
                viagemId: viagemId,
            };

            try {

                if (dadoOnStore === false) {
                    await addDoc(alimentacaoRef, dadosAlimentacao);

                    alert('Cadastro de alimentação realizado com sucesso!');
                }

                if (dadoOnStore === true) {
                    const docRef = doc(firestore, 'alimentacao', documentId);


                    await updateDoc(docRef, {
                        Local: local,
                        Endereco: endereco,
                        Data: data,
                        Horario: horario,
                        Valor: valor,
                    });

                    alert('Edições salvas com sucesso!')
                }
            }
            catch (error) {
                console.log('Ocorreu um erro! ', error)
            }

        } else {
            alert('Preencha os campos corretamente!');
        }
    };

    const cancelAlimentacao = () => {
        alert('Cadastro de Alimentação cancelado!');
    };


    return (

        <View style={styles.containerPai}>
            <View>
                <View style={styles.container}>
                    <View style={styles.boxAlimentacao}>

                        <Image source={require('../assets/img/imgalimentacao.png')} style={styles.img} />

                        <InputNormal
                            nome={'Nome do Local'}
                            valor={'Restaurante XYZ'}
                            value={local}
                            onChangeText={setLocal}
                        />
                        <Image source={require('../assets/img/localIcon.png')} style={styles.icon} />

                        <InputNormal
                            nome={'Endereço do Local'}
                            valor={'Rua ABC, 123'}
                            value={endereco}
                            onChangeText={setEndereco}
                        />
                        <Image source={require('../assets/img/adressIcon.png')} style={styles.icon} />

                        <View style={styles.inputbox}>
                            <View style={styles.boxHour}>
                                <Text style={styles.textInput}>Refeição</Text>

                                <TouchableOpacity
                                    style={styles.inputMenor}
                                    onPress={() => setIsActiveHour(!isActiveHour)}
                                >

                                    <TouchableOpacity>
                                        <Text
                                            onPress={() => setIsActiveHour(!isActiveHour)}
                                            style={[styles.placeholder, selectedHour !== valor && styles.selectedValue]}
                                        >
                                            {selectedHour ? selectedHour : "Café da manhã"}

                                        </Text>
                                    </TouchableOpacity>

                                    {isActiveHour && (
                                        <View style={styles.dropdownContent}>
                                            {optionsHour.map(optionHour => (
                                                <TouchableOpacity
                                                    key={optionHour}
                                                    style={styles.dropdownItem}
                                                    onPress={() => {
                                                        setSelectedHour(optionHour)
                                                        setHorario(optionHour)
                                                        setIsActiveHour(false)
                                                    }}
                                                >
                                                    <Text>{optionHour}</Text>
                                                </TouchableOpacity>
                                            ))}

                                        </View>
                                                                       )}

                                                                       </TouchableOpacity>
                                       
                                                                   </View>
                                                               </View>
                                       
                                                               <View style={styles.inputbox}>
                                                                   <View style={styles.input}>
                                                                       <TouchableWithoutFeedback onPress={() => setMostrarCalendarioData(true)}>
                                                                           <View>
                                                                               <Text style={styles.textInput}>Data</Text>
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
                                                                       <Image source={require('../assets/img/calendar.png')} style={styles.iconLeft} />
                                                                   </View>
                                       
                                                                   <View style={styles.input}>
                                                                       <InputMenor
                                                                           nome={'Valor'}
                                                                           valor={'50,00'}
                                                                           value={valor}
                                                                           onChangeText={setValor}
                                                                       />
                                                                       <Image source={require('../assets/img/moneyIcon.png')} style={styles.iconLeftMoney} />
                                                                   </View>
                                                               </View>
                                       
                                                           </View>
                                       
                                       
                                                           <View style={styles.buttonBox}>
                                                               <Button
                                                                   textButton={"SALVAR"}
                                                                   color='#F5BD60'
                                                                   fontColor='#FFFFFF'
                                                                   onpress={saveAlimentacao}
                                                               />
                                       
                                                               <Button
                                                                   textButton={"CANCELAR"}
                                                                   color='#FFFFFF'
                                                                   fontColor='#181818'
                                                                   borderColor={'black'}
                                                                   borderWidth={2}
                                                                   onpress={cancelAlimentacao}
                                                               />
                                                           </View>
                                                       </View>
                                                   </View>
                                       
                                                   <DateTimePickerModal
                                                       isVisible={mostrarCalendarioData}
                                                       mode="date"
                                                       locale="pt_BR"
                                                       onConfirm={handleSelecionarData}
                                                       onCancel={() => setMostrarCalendarioData(false)}
                                                   />
                                       
                                               </View>
                                       
                                           );
                                       
                                       }
                                       
                                       export default Alimentacao;
                                       
                                       const styles = StyleSheet.create({
                                           buttonBox: {
                                               flexDirection: 'row',
                                               alignItems: 'center',
                                               justifyContent: 'center',
                                               gap: 10,
                                           },
                                           boxAlimentacao: {
                                               alignItems: 'center',
                                               margin: 25,
                                               marginTop: -12,
                                               marginBottom: -5,
                                               height: 'auto',
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
                                           iconLeftMoney: {
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
                                           inputbox: {
                                               flexDirection: 'row',
                                               gap: 25
                                           },
                                           inputboxLast: {
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
                                               position: 'relative'
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
                                           dropdownContent: {
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
                                               position: 'relative'
                                           }
                                       })
                                       
