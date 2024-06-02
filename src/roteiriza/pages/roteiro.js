import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { collection, query, where, getDocs } from '@firebase/firestore';
import { firestore } from '../firebase/config'; 
import { TextInput } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import "moment/locale/pt-br";

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

        const today = new Date().toISOString().split("T")[0];

    return (
        <View style={styles.container}>
            <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: "#063A7A",
          },
          [today]: { selected: true, marked: true, selectedColor: "#F5BD60" },
        }}
        theme={{
          todayTextColor: "#F5BD60",
          arrowColor: "#063A7A",
          textSectionTitleColor: "#063A7A",
          selectedDayBackgroundColor: "#063A7A",
          dotColor: "#063A7A",
        }}
        monthFormat={"MMMM yyyy"}
        locale={"pt-br"}
        firstDay={1}
      />
      <View style={styles.contentContainer}>
      <ScrollView>
          <Text style={styles.header}>Manhã</Text>
          {listaManha.length > 0 ? (
            listaManha.map((list, index) => (
              <View key={index} style={styles.boxLista}>
                <TextInput
                  label="Nome do Local"
                  value={list.titulo}
                  editable={false}
                  style={styles.input}
                  theme={{ colors: { text: "#063A7A", primary: "#063A7A" } }}
                />
              </View>
            ))
          ) : (
            <View style={styles.noDataBox}>
              <Text style={styles.noDataText}>
                Nenhum roteiro para essa data e hora...
              </Text>
            </View>
          )}

          <Text style={styles.header}>Tarde</Text>
          {listaTarde.length > 0 ? (
            listaTarde.map((list, index) => (
              <View key={index} style={styles.boxLista}>
                <TextInput
                  label="Nome do Local"
                  value={list.titulo}
                  editable={false}
                  style={styles.input}
                  theme={{ colors: { text: "#063A7A", primary: "#063A7A" } }}
                />
              </View>
            ))
          ) : (
            <View style={styles.noDataBox}>
              <Text style={styles.noDataText}>
                Nenhum roteiro para essa data e hora...
              </Text>
            </View>
          )}

          <Text style={styles.header}>Noite</Text>
          {listaNoite.length > 0 ? (
            listaNoite.map((list, index) => (
              <View key={index} style={styles.boxLista}>
                <TextInput
                  label="Nome do Local"
                  value={list.titulo}
                  editable={false}
                  style={styles.input}
                  theme={{ colors: { text: "#063A7A", primary: "#063A7A" } }}
                />
              </View>
            ))
          ) : (
            <View style={styles.noDataBox}>
              <Text style={styles.noDataText}>
                Nenhum roteiro para essa data e hora...
              </Text>
            </View>
          )}

          <Text style={styles.header}>
            Valor a ser gasto no dia (expectativa)
          </Text>
          <View style={styles.valueBox}>
            <TextInput
              value={String(valor)}
              editable={false}
              label="Valor a ser gasto no dia..."
              style={styles.input} 
              theme={{ colors: { text: "#063A7A", primary: "#063A7A" } }}
            />
          </View>
        </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      padding: 10,
    },
    contentContainer: {
      marginTop: 20,
    },
    header: {
      fontSize: 20,
      color: "#063A7A",
      marginVertical: 10,
      marginLeft: 10,
      fontWeight: "bold",
    },
    boxLista: {
      marginBottom: 20,
      marginHorizontal: 10,
      borderRadius: 15,
      backgroundColor: "#f5f5f5",
      padding: 10,
    },
    noDataBox: {
      marginBottom: 20,
      marginHorizontal: 10,
      borderRadius: 15,
      backgroundColor: "#f5f5f5",
      padding: 10,
    },
    input: {
      fontSize: 16,
    },
    valueBox: {
      marginBottom: 20,
      marginHorizontal: 10,
      padding: 10,
    },
    valueInput: {
      fontSize: 16,
    },
    noDataText: {
      fontSize: 16,
      color: "gray",
      textAlign: "center",
    },
  });

export default Roteiro;
