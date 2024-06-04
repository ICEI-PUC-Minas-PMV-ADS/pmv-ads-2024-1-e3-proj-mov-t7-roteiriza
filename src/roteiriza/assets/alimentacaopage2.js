import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text } from 'react-native';

const Alimentacao = () => {
  const [localName, setLocalName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [expense, setExpense] = useState('');

  const saveData = () => {
    // Lógica para salvar os dados
  };

  const cancel = () => {
    // Lógica para cancelar
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 40 }}>
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
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#063A7A', fontSize: 16, marginRight: 10 }}>Data</Text>
          <Image
            source={require('../assets/calendar.png')}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
          <TextInput
            style={{ flex: 1, backgroundColor: '#EFEFEF', borderRadius: 5, padding: 10 }}
            placeholder="Data"
            value={date}
            onChangeText={setDate}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
          <Text style={{ color: '#063A7A', fontSize: 16, marginRight: 10 }}>Hora</Text>
          <Image
            source={require('../assets/dropdown.png')}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
          <TextInput
            style={{ flex: 1, backgroundColor: '#EFEFEF', borderRadius: 5, padding: 10 }}
            placeholder="Horário"
            value={time}
            onChangeText={setTime}
          />
        </View>
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
    </View>
  );
};

export default Alimentacao;
