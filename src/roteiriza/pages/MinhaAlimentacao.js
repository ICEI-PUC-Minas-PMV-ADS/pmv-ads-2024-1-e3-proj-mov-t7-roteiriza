import React, { useState, useEffect } from 'react';
import {Text, View, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { collection, query, where, getDocs, deleteDoc, doc } from '@firebase/firestore'; // Adicione deleteDoc e doc
import { firestore } from '../firebase/config';
import { useRoute } from '@react-navigation/native';
import ListaAdicionada from '../components/listaAdicionada';
import ImageLista from '../components/imageListaAlimentacao';


const MinhaAlimentacao = ({userId}) => {
    const navigation = useNavigation(); 
    const route = useRoute();
    const { viagemId } = route.params;
    
    const [ListAlimentacao, setListAlimentacao] = useState([]);

    useEffect(() => {
        loadAlimentacao();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
        loadAlimentacao();
        }, [])
      );

    const loadAlimentacao = async () => {
        try {
            const q = query(collection(firestore, 'alimentacao'), where('viagemId', '==', viagemId));
            const querySnapshot = await getDocs(q);
      
            if (!querySnapshot.empty) {
              const docSnap = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
              setListAlimentacao(docSnap);

            } else {
              console.log('Sem restaurantes cadastrados');
              setListAlimentacao([]);
            }
        } catch (error) {
            console.log('Ocorreu um erro: ', error);
        }
    };

    const handleAdicionar = (alimentacaoId) => {
        navigation.navigate('Cadastrar restaurante', {viagemId, alimentacaoId})
    }

    const handlePressDelete = async (alimentacaoId) => {
        try {
            await deleteDoc(doc(firestore, 'alimentacao', alimentacaoId)); // Certifique-se que a coleção seja 'alimentacao'
            loadAlimentacao(); // Atualiza a lista de restaurantes após a exclusão
        } catch (error) {
            console.log('Ocorreu um erro ao tentar excluir o restaurante!', error);
        }
    };

    return(
        <View>
            <ImageLista />

            <ScrollView>
                {ListAlimentacao.length > 0 ? (
                    ListAlimentacao.map((alimentacao, index) => (
                        <View key={index} style={styles.boxLista}>
                            <ListaAdicionada
                                NomeLocal={alimentacao.Local}
                                onPress={() => handleAdicionar(alimentacao.id)} // Corrigido para função anônima
                                Data={alimentacao.Data}
                                Horario={alimentacao.Horario}
                            />
                            <View style={styles.acaoBox}>
                                <TouchableOpacity onPress={() => handleAdicionar(alimentacao.id)}>
                                    <Image style={styles.icons} source={require('../assets/img/editarIcon.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handlePressDelete(alimentacao.id)}>
                                    <Image style={styles.icons} source={require('../assets/img/deleteIcon.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>       
                    ))
                ) : (
                    <View style={styles.boxLista}>
                        <Text>Nenhum restaurante cadastrado</Text>
                    </View>
                )}
                <TouchableOpacity style={styles.btn1} onPress={handleAdicionar}>
                    <Text style={[styles.text, { color: '#FFFFFF' }]}>ADICIONAR NOVO RESTAURANTE</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default MinhaAlimentacao;

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