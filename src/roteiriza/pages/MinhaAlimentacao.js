import React, { useState } from 'react';
import {Text, View, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import  Header  from '../components/Header'
import { useNavigation } from '@react-navigation/native';


import { useRoute } from '@react-navigation/native';
import ListaAdicionada from '../components/listaAdicionada';
import imageListaAlimentacao from '../components/imageListaAlimentacao';


const MinhaAlimentacao = ({userId}) => {
    
    const navigation = useNavigation(); 

    const route = useRoute();
    const { viagemId } = route.params;
    
    const [ListAlimentacao, setListAlimentacao] = useState([]);

    const loadAlimentacao = async () => {

        try {
            const q = query(collection(firestore, 'restaurantes'), where('viagemId', '==', viagemId));
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
        navigation.navigate('Adicionar restaurante', {viagemId, alimentacaoId})
    }
    

    return(
        <View>
            <Header title={'Alimentação'}  />
            <imageListaAlimentacao />

            <ScrollView>

                {ListAlimentacao.length > 0 ? (
                    ListAlimentacao.map((alimentacao, index) => (
                        <View key={index} style={styles.boxLista}>
                            <ListaAdicionada
                                NomeLocal={alimentacao.Local}
                                onPress={handleAdicionar(alimentacao.id)}
                                Data={alimentacao.Data}
                                Horario={alimentacao.Horario}
                            />
                            <TouchableOpacity style={styles.btn1} onPress={handleAdicionar}>
                                <Text style={[styles.text, { color: '#FFFFFF' }]}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        
                    ))
                ) : (
                    <View style={styles.boxLista}>
                        <Text>Nenhum restaurante cadastrado</Text>

                        <TouchableOpacity style={styles.btn1} onPress={handleAdicionar}>
                            <Text style={[styles.text, { color: '#FFFFFF' }]}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
        width: 160,
        height: 50,
        backgroundColor: '#F5BD60',
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        color: '#063A7A',
        fontWeight: 'bold',
      },
})