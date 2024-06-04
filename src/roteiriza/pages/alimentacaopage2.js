import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';

const Alimentacao = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setModalVisible(false);
  };

  const handleTimeSelection = (time) => {
    // Aqui você pode fazer o que desejar com a opção de horário selecionada
    console.log('Horário selecionado:', time);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./caminho/para/sua/imagem')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.fieldsContainer}>
        <Text style={styles.label}>Nome do local</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do local"
        />
        <Text style={styles.label}>Endereço do local</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o endereço do local"
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.dateContainer}>
            <Text style={styles.label}>Data</Text>
            <Text>{selectedDate || 'Selecionar Data'}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.timeContainer}>
          <Text style={styles.label}>Horário</Text>
          <TouchableOpacity onPress={() => handleTimeSelection('Dia')}>
            <Text>Dia</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeSelection('Tarde')}>
            <Text>Tarde</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeSelection('Noite')}>
            <Text>Noite</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Valor a ser gasto</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor a ser gasto"
          keyboardType="numeric"
        />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          {/* Aqui você pode adicionar o componente de seleção de data */}
          <Text>Selecione a data</Text>
          <Button
            title="Fechar"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  fieldsContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  timeContainer: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Alimentacao;
