import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { collection, addDoc, query, where, getDoc, getDocs, updateDoc, doc } from '@firebase/firestore';
import { firestore } from '../firebase/config';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Alimentacao = ({ userId }) => {

    const route = useRoute();
    const { viagemId, alimentacaoId } = route.params;

    // Dropdown
    const [isActiveHour, setIsActiveHour] = useState(false);
    const optionsHour = ['Manhã', 'Tarde', 'Noite'];
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
                const docRef = doc(firestore, 'alimentacoes', alimentacaoId);
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
                    console.log('Sem alimentações cadastradas');
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
        const alimentacaoRef = collection(firestore, 'alimentacoes');

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

                if (dadoOnStore == false) {
                    await addDoc(alimentacaoRef, dadosAlimentacao);

                    alert('Cadastro de alimentação realizado com sucesso!');
                }

                if (dadoOnStore == true) {
                    const docRef = doc(firestore, 'alimentacoes', documentId);

                    await updateDoc(docRef, {
                        Local: local,
                        Endereco: endereco,
                        Data: data,
                        Horario: horario,
                        Valor: valor,
                    });

                    alert('Edições salvas com sucesso!');
                }
            } catch (error) {
                console.log('Ocorreu um erro! ', error);
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
                    <View style={styles.boxAlimentacoes}>

                        <Image source={require('../assets/img/alimentacao.jpeg')} style={styles.img} />

                        <TextInput
                            style={styles.input}
                            placeholder={'Nome do Local'}
                            value={local}
                            onChangeText={setLocal}
                        />
                        <Image source={require('../assets/img/localIcon.png')} style={styles.icon} />

                        <TextInput
                            style={styles.input}
                            placeholder={'Endereço do Local'}
                            value={endereco}
                            onChangeText={setEndereco}
                        />
                        <Image source={require('../assets/img/adressIcon.png')} style={styles.icon} />

                        <View style={styles.inputbox}>
                            <View style={styles.boxHour}>
                                <Text style={styles.textInput}>Horário</Text>

                                <TouchableOpacity
                                    style={styles.inputMenor}
                                    onPress={e => setIsActiveHour(!isActiveHour)}
                                >

                                    <TouchableOpacity>
                                        <Text
                                            onPress={() => setIsActiveHour(!isActiveHour)}
                                            style={[styles.placeholder, selectedHour !== valor && styles.selectedValue]}
                                        >
                                            {selectedHour ? selectedHour : "Manhã"}

                                        </Text>
                                    </TouchableOpacity>

                                    {isActiveHour && (
                                        <View style={styles.dropdownContent}>
                                            {optionsHour.map(optionHour => (
                                                <TouchableOpacity
                                                    key={optionHour}
                                                    style={styles.dropdownItem}
                                                    onPress={() => {
                                                        setSelectedHour(optionHour);
                                                        setHorario(optionHour);
                                                        setIsActiveHour(false);
                                                    }}
                                                >
                                                    <Text>{optionHour}</Text>
                                                </TouchableOpacity>
                                            ))}

                                        </View>
                                    )}

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setIsActiveHour(!isActiveHour)}
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
                                <Image source={require('../assets/img/calendar.png')} style={styles.iconLeft} />
                            </View>

                            <View style={styles.input}>
                                <TextInput
                                    style={styles.inputMenor}
                                    placeholder={'Valor a ser gasto'}
                                    placeholderTextColor={'#B5B3B3'}
                                    value={valor}
                                    onChangeText={setValor}
                                />
                                <Image source={require('../assets/img/moneyIcon.png')} style={styles.iconLeftMoney} />
                            </View>
                        </View>

                    </View>

                    <View style={styles.buttonBox}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#F5BD60' }]}
                            onPress={saveAlimentacao}
                        >
                            <Text style={styles.buttonText}>SALVAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#FFFFFF', borderColor: 'black', borderWidth: 2 }]}
                            onPress={cancelAlimentacao}
                        >
                            <Text style={[styles.buttonText, { color: '#181818' }]}>CANCELAR</Text>
                        </TouchableOpacity>
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
    containerPai: {
        flex: 1,
    },
    container: {
        alignItems: 'center',
        height: '100%',
    },
    boxAlimentacoes: {
        alignItems: 'center',
        margin: 25,
        marginTop: -12,
        marginBottom: -5,
        height: 'auto',
    },
    inputbox: {
        flexDirection: 'row',
        gap: 25,
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
    iconLeftMoney: {
        width: 21,
        height: 21,
        bottom: 28,
        left: 12
    },
    img: {
        marginBottom: 10,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CACACA',
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 15,
        width: '100%',
        height: 50,
    },
    inputMenor: {
        borderWidth: 1,
        borderColor: '#CACACA',
        borderRadius: 10,
        paddingLeft: 15,
        paddingRight: 35,
        marginBottom: 15,
        width: '100%',
        height: 50,
    },
    textInput: {
        marginBottom: 5,
        color: '#181818',
        fontWeight: 'bold',
    },
    buttonBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
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
    iconRight: {
        width: 21,
        height: 21,
        bottom: 30,
        left: 9
    },
});

