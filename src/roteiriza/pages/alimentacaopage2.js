import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropdownHour from '../components/dropdownHour'; 
import { collection, query, where, getDocs } from "@firebase/firestore";
import { firestore } from "../firebase/config";

const Alimentacao = () => {
  const [localName, setLocalName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [expense, setExpense] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null); 

  const saveData = () => {
    const dataAlimentacao = {
      localName: localName,
      address: address,
      date: date,
      time: time,
      expense: expense
    };
    console.log('Dados de alimentação:', dataAlimentacao);
  };

  const cancel = () => {
    setLocalName('');
    setAddress('');
    setDate('');
    setTime('');
    setExpense('');
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toLocaleDateString('pt-BR');
    setDate(formattedDate);
    hideDatePicker();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/alimentacaotela.jpeg')}
            style={styles.image}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome do Local</Text>
          <View style={styles.inputRow}>
            <Image
              source={require('../assets/localIcon.png')}
              style={styles.icon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Nome do local"
              value={localName}
              onChangeText={setLocalName}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Endereço</Text>
          <View style={styles.inputRow}>
            <Image
              source={require('../assets/adressIcon.png')}
              style={styles.icon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Endereço"
              value={address}
              onChangeText={setAddress}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Data</Text>
          <View style={styles.inputRow}>
            <Image
              source={require('../assets/calendar.png')}
              style={styles.icon}
            />
            <TouchableOpacity onPress={showDatePicker} style={{ flex: 1 }}>
              <TextInput
                style={styles.textInput}
                placeholder="Data"
                value={date}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <DropdownHour
            nome="Horário"
            valor="Selecione o horário"
            selected={selectedTime}
            setSelected={setSelectedTime}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveData}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={cancel}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  imageContainer: {
    marginTop: 60, // Diminuir a margem superior para subir a imagem
    alignItems: 'center',
  },
  image: {
    width: 300, // Diminuir a largura da imagem
    height: 200, // Diminuir a altura da imagem
    borderRadius: 10,
  },
  inputContainer: {
    marginTop: 10,
  },
  label: {
    color: '#063A7A',
    fontSize: 16,
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#F5BD60',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'black',
  },
});

export default Alimentacao;
