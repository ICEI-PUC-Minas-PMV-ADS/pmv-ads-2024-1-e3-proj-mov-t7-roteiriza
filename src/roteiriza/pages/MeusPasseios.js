import React, { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import ContainerPasseios from '../components/containerPasseios';
import Button from '../components/buttonAdicionar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { collection, query, where, getDocs, deleteDoc, doc } from '@firebase/firestore'; // Adicione deleteDoc e doc
import { app, firestore } from '../firebase/config';
import { useRoute } from '@react-navigation/native';
import ListaAdicionada from '../components/listaAdicionada';
import ImageLista from '../components/imageLista';

const MeusPasseios = ({ userId }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const { viagemId } = route.params;

    const [listPasseios, setListPasseios] = useState([]); // Usar camelCase para estados e variáveis

    useEffect(() => {
        loadPasseios();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
        loadPasseios();
        }, [])
      );

    const loadPasseios = async () => {
        try {
            const q = query(collection(firestore, 'passeios'), where('viagemId', '==', viagemId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setListPasseios(docSnap);
            } else {
                console.log('Sem passeios cadastrados');
                setListPasseios([]);
            }
        } catch (error) {
            console.log('Ocorreu um erro: ', error);
        }
    };

    const handleAdicionar = (passeioId) => {
        navigation.navigate('Criar Passeio', { viagemId, passeioId });
    };

    const handlePressEdit = (passeioId) => {
        navigation.navigate('Criar Passeio', { viagemId, passeioId });
    };

    const handlePressDelete = async (passeioId) => {
        try {
            await deleteDoc(doc(firestore, 'passeios', passeioId)); // Certifique-se que a coleção seja 'passeios'
            loadPasseios(); // Atualiza a lista de passeios após a exclusão
        } catch (error) {
            console.log('Ocorreu um erro ao tentar excluir o passeio!', error);
        }
    };

    return (
        <View>
            <ImageLista />

            <ScrollView>
                {listPasseios.length > 0 ? (
                    listPasseios.map((passeio, index) => (
                        <View key={index} style={styles.boxLista}>
                            <ListaAdicionada
                                NomeLocal={passeio.Local}
                                onPress={() => handleAdicionar(passeio.id)} // Corrigido para função anônima
                                Data={passeio.Data}
                                Horario={passeio.Horario}
                            />
                            <View style={styles.acaoBox}>
                                <TouchableOpacity onPress={() => handlePressEdit(passeio.id)}>
                                    <Image style={styles.icons} source={require('../assets/img/editarIcon.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handlePressDelete(passeio.id)}>
                                    <Image style={styles.icons} source={require('../assets/img/deleteIcon.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={styles.boxLista}>
                        <Text>Nenhum passeio cadastrado</Text>
                    </View>
                )}
                <TouchableOpacity style={styles.btn1} onPress={handleAdicionar}>
                    <Text style={[styles.text, { color: '#FFFFFF' }]}>ADICIONAR NOVO LOCAL</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default MeusPasseios;

const styles = StyleSheet.create({
    boxLista: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn1: {
        width: 282,
        height: 50,
        backgroundColor: '#F5BD60',
        borderRadius: 10,
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
      },
    text: {
        color: '#063A7A',
        fontWeight: 'bold',
      },
    acaoBox: {
        flexDirection: 'row',
        gap: 10,  
        left: 277,
        top: 15,
        position: 'absolute'
    },
    icons:{
        width: 24,
        height: 24,
        
    },
})