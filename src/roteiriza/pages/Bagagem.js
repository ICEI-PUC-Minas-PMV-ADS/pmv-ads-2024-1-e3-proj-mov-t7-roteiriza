import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import CheckboxForm from '../components/CheckboxForm';
import Typography from '../components/Typography';

const Bagagem = () => {
  const route = useRoute();
  const { viagemId } = route.params;

  const [selectedItems, setSelectedItems] = useState([]);

  // Função para adicionar ou remover um item da lista de itens selecionados
  const handleCheckboxPress = (item) => {
    const index = selectedItems.findIndex((selectedItem) => selectedItem === item);
    if (index === -1) {
      // Adiciona o item à lista se não estiver presente
      setSelectedItems([...selectedItems, item]);
    } else {
      // Remove o item da lista se estiver presente
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    }
  };

  // Função para salvar a lista de itens selecionados em um arquivo JSON
  const saveLista = () => {
    // Converte a lista de itens selecionados para JSON
    const jsonItems = JSON.stringify(selectedItems);
    // Aqui você pode salvar jsonItems em um arquivo ou enviá-lo para um serviço de backend
    console.log('Itens salvos:', jsonItems);
  };

  // Função para limpar a lista de itens selecionados
  const clearList = () => {
    setSelectedItems([]);
  };

  return (
    <Container>
      <Header title="Mala de viagem" />
      <Body>
      <ScrollView>

        <View style={styles.card}>
          <Image style={styles.cardImage} source={require('../assets/Mala-de-viagem.png')} />
          <Typography style={styles.bodyText}>
            Adicione abaixo os itens que você deseja levar para sua viagem e monte um checklist!
          </Typography>
        </View>
        
          <CheckboxForm onCheckboxPress={handleCheckboxPress} viagemId={viagemId} />
        
          </ScrollView>

        <View style={styles.botaoContainer}>
          <TouchableOpacity style={styles.btn1} onPress={saveLista}>
            <Text style={[styles.text, { color: '#FFFFFF' }]}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2} onPress={clearList}>
            <Text style={styles.text}>Limpar lista</Text>
          </TouchableOpacity>        
        </View>

      </Body>

    </Container>
  );
};


const styles = StyleSheet.create({
  bodyText: {
    color: '#063A7A',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 20,
  },
  card: {
    alignItems: 'center',
  },
  cardImage: {
    margin: 10,
  },
  btn1: {
    flex: 1, 
    height: 50,
    backgroundColor: '#F5BD60',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  btn2: {
    flex: 1, 
    height: 50,
    backgroundColor: '#FCFCFE',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#696969',
  },
  botaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  text: {
    color: '#063A7A',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Bagagem;