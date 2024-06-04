import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Alimentacao = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleConfirmDate = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/alimentacaotela.jpeg')}
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
        <TouchableOpacity onPress={showDatePicker}>
          <View style={styles.dateContainer}>
            <Text style={styles.label}>Data</Text>
            <Text>{selectedDate || 'Selecionar Data'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.timeContainer}>
            <Text style={styles.label}>Horário</Text>
            <Text>{selectedTime || 'Selecionar Horário'}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.label}>Valor a ser gasto</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor a ser gasto"
          keyboardType="numeric"
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
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
