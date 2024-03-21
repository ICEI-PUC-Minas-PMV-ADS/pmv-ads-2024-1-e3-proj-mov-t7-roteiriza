import React, { useState } from 'react';
import { StyleSheet, View, Alert, Image, Dimensions } from 'react-native';
import { Appbar, Text, TextInput, Button } from 'react-native-paper';

import Input from './Input';

export default function AssetExample() {
  return (
    <View style={styles.container}>
      <View style = {styles.content}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />

        <Input label="Nome completo" />

        <Input label="Email" />

        <Input label="Senha" />

        <Button mode="contained" style={styles.button}>
          Cadastrar
        </Button>
        <Text style={styles.login}>Já tem uma conta? Faça seu login</Text>

        <Text> </Text>
      </View>
    </View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  logo: {
    height: 220,
    width: 220,
    marginLeft: 50,
    marginBottom: 40,
    borderRadius: 7
  },

  button: {
    width: 250,
    marginLeft: 40,
    marginTop: 40
  },

  login: {
    paddingTop: 20,
    fontSize: 12,
    marginLeft: 60,

  },
});
