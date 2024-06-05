
import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, ScrollView, Platform } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';

const Alimentacao = () => {
  const [localName, setLocalName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [expense, setExpense] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null); // Alterado para null

  const timeOptions = [
    { label: 'Dia', value: 'Dia' },
    { label: 'Tarde', value: 'Tarde' },
    { label: 'Noite', value: 'Noite' }
  ];

  const saveData = () => {
    // Lógica para salvar os dados
  };

  const cancel = () => {
    // Lógica para cancelar
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
    <ScrollView style={{ flex: 1, paddingHorizontal: 40 }}>
      <View style={{ marginTop: 80 }}>
        <Image
          source={require('../assets/alimentacaotela.jpeg')}
          style={{
            width: 340,
            height: 300,
            borderRadius: 10,
            marginLeft: 0,
            marginRight: 40,
          }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: '#063A7A', fontSize: 16, marginBottom: 5 }}>Nome do Local</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/localIcon.png')}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
          <TextInput
            style={{ flex: 1, backgroundColor: '#EFEFEF', borderRadius: 5, padding: 10 }}
            placeholder="Nome do local"
            value={localName}
            onChangeText={setLocalName}
          />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: '#063A7A', fontSize: 16, marginBottom: 5 }}>Endereço</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/adressIcon.png')}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
          <TextInput
            style={{ flex: 1, backgroundColor: '#EFEFEF', borderRadius: 5, padding: 10 }}
            placeholder="Endereço"
            value={address}
            onChangeText={setAddress}
          />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: '#063A7A', fontSize: 16, marginBottom: 5 }}>Data</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/calendar.png')}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
          <TouchableOpacity onPress={showDatePicker} style={{ flex: 1 }}>
            <TextInput
              style={{ flex: 1, backgroundColor: '#EFEFEF', borderRadius: 5, padding: 10 }}
              placeholder="Data"
              value={date}
              editable={false}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: '#063A7A', fontSize: 16, marginBottom: 5 }}>Horário</Text>
        <RNPickerSelect
          placeholder={{ label: 'Selecione o horário', value: null }}
          onValueChange={(value) => setSelectedTime(value)}
          items={timeOptions}
          style={{ inputIOS: { backgroundColor: '#EFEFEF', borderRadius: 5, padding: 10, marginTop: 5 }, inputAndroid: { backgroundColor: '#EFEFEF', borderRadius: 5, padding: 10, marginTop: 5 } }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: '#063A7A', fontSize: 16, marginBottom: 5 }}>Valor a ser gasto</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/moneyIcon.png')}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
          <TextInput
            style={{ flex: 1, backgroundColor: '#EFEFEF', borderRadius: 5, padding: 10 }}
            placeholder="Valor a ser gasto"
            keyboardType="numeric"
            value={expense}
            onChangeText={setExpense}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity
          style={{ flex: 1, marginRight: 5, backgroundColor: '#F5BD60', padding: 10, borderRadius: 5, alignItems: 'center' }}
          onPress={saveData}
        >
          <Text style={{ color: 'white' }}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, marginLeft: 5, backgroundColor: 'white', borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 5, alignItems: 'center' }}
          onPress={cancel}
        >
          <Text style={{ color: 'black' }}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};

export default Alimentacao;
