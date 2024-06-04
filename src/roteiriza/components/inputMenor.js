// InputMenor.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputMenor = ({ nome, valor, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{nome}</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CACACA',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default InputMenor;
