import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { collection, query, where, getDocs } from '@firebase/firestore';
import { firestore } from '../firebase/config'; 
import { TextInput } from "react-native-paper";

const Roteiro = ({ viagemId }) => {

    const [listDados, setListDados] = useState([]);
    const [listaManha, setListaManha] = useState([]);
    const [listaTarde, setListaTarde] = useState([]);
    const [listaNoite, setListaNoite] = useState([]);

    const [selectedDate, setSelectedDate] = useState('');
    const [valor, setValor] = useState('');

    const loadDados = async (viagemId) => {
        try {
            // Referências às coleções 'passeio' e 'alimentacao'
            const passeioCollectionRef = collection(firestore, 'passeio');
            const alimentacaoCollectionRef = collection(firestore, 'alimentacao');

            // Consultas filtrando apenas por viagemId
            const passeioQuery = query(passeioCollectionRef, where('viagemId', '==', viagemId));
            const alimentacaoQuery = query(alimentacaoCollectionRef, where('viagemId', '==', viagemId));

            // Execução das consultas
            const [passeioSnapshot, alimentacaoSnapshot] = await Promise.all([
                getDocs(passeioQuery),
                getDocs(alimentacaoQuery)
            ]);

            // Mapeando resultados para uma lista combinada
            const passeioList = passeioSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const alimentacaoList = alimentacaoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Atualizando o estado com a lista combinada // Realizando Join
            setListDados([...passeioList, ...alimentacaoList]);

        } catch (error) {
            console.log('Ocorreu um erro: ', error);
        }
    };

    useEffect(() => {
        if (viagemId) {
            loadDados(viagemId);
        }

        if(selectedDate){
            filtro(selectedDate)
        }

    }, [viagemId, selectedDate]);


    const filtro = (selectedDate) => {
    // Filtrando a lista de dados com base na data selecionada
        const filteredListDados = listDados.filter(item => item.data === selectedDate);

        const ListManha = filteredListDados.filter(item => item.Horario === 'Manha');
        const ListTarde = filteredListDados.filter(item => item.Horario === 'Tarde');
        const ListNoite = filteredListDados.filter(item => item.Horario === 'Noite');

        let valorAux = 0;
        
        for (let i = 0; i < filteredListDados.length; i++) {
            valorAux += filteredListDados[i].valor || 0;
        }

        setValor(valorAux);
        setListaManha(ListManha);
        setListaTarde(ListTarde);
        setListaNoite(ListNoite);
    }


    return (
        <View>
            <ScrollView>

                <Text>Manha</Text>                   
                {listaManha.length > 0 ? (
                    listaManha.map((list, index) => (
                     
                        <View key={index} style={styles.boxLista}>
                            <TextInput
                                label="Nome do Local"
                                value={list.titulo}                                                             
                            />                       
                        </View>
                    ))
                ) : (
                    <View style={styles.boxLista}>
                        <Text>Nenhum roteiro para essa data e hora</Text>                   
                    </View>
                )}

                <Text>Tarde</Text>                   
                {listaTarde.length > 0 ? (
                    listaTarde.map((list, index) => (
                     
                        <View key={index} style={styles.boxLista}>
                            <TextInput
                                label="Nome do Local"
                                value={list.titulo}                                                             
                            />                       
                        </View>
                    ))
                ) : (
                    <View style={styles.boxLista}>
                        <Text>Nenhum roteiro para essa data e hora</Text>                   
                    </View>
                )}

                <Text>Noite</Text>                   
                {listaNoite.length > 0 ? (
                    listaNoite.map((list, index) => (
                     
                        <View key={index} style={styles.boxLista}>
                            <TextInput
                                label="Nome do Local"
                                value={list.titulo}                                                             
                            />                       
                        </View>
                    ))
                ) : (
                    <View style={styles.boxLista}>
                        <Text>Nenhum roteiro para essa data e hora</Text>                   
                    </View>
                )}

                <TextInput
                    placeholder="Não existe custo nesse dia"
                    value={valor}                                                             
                />     

            </ScrollView>
        </View>
    );
};

export default Roteiro;
