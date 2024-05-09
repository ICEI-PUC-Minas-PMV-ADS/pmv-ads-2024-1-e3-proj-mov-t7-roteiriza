import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { auth } from '@firebase/auth';
import { Background } from '../components/ContainerTitle';

const ForgotPasswordScreen = ({ user, handleResetPassword }) => {

    const [emailRec, setEmailRec] = useState('');

    const handleResetPasswordClick = () => {
      handleResetPassword(emailRec);
    }

  return (
    <Background style={styles.container} colors={['#ffff', '#ffff']}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/recSenha.png')} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Recuperar minha senha</Text>
        <Text style={styles.description}>
          Esqueceu sua senha? Não se preocupe.{"\n"}Digite seu e-mail abaixo e enviaremos um código de acesso para você cadastrar uma nova senha.
        </Text>

        <TextInput
          style={styles.input}
          value={emailRec}
          onChangeText={setEmailRec}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity onPress={handleResetPasswordClick} style={styles.button}>
          <Text style={styles.buttonText}>Enviar código</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text>Novo membro?</Text>
          <Text style={styles.link}>Registrar-se</Text>
        </View>
      </View>
    </Background>
  );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 10,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    // Estilos do logo
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
    color: '#063A7A',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#063A7A',
    borderRadius: 5,
    marginBottom: 20,
  },
  bottom: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#063A7A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 10,
    width: '70%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  link: {
    fontWeight: 'bold',
    color: '#063A7A',
  },
});
