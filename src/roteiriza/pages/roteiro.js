import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const TravelPlanScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Roteiro de Viagens</Text>
      </View>
      <Calendar
        style={styles.calendar}
        // Aqui você pode adicionar mais configurações para o calendário, se necessário
      />
      <TextInput
        style={styles.input}
        placeholder="Manhã"
      />
      <TextInput
        style={styles.input}
        placeholder="Tarde"
      />
      <TextInput
        style={styles.input}
        placeholder="Noite"
      />
      <TextInput
        style={styles.input}
        placeholder="Valor gasto no dia"
        keyboardType="numeric"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  calendar: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
  },
});

export default TravelPlanScreen;
