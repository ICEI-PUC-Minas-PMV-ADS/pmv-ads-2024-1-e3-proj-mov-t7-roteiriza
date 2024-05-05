import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Input from '../components/input';
import {firebase } from '../firebase/config';
import { enviarNovoEmail } from '../service/email';


const recSenha = () => {
  const usersRef = firebase.firestore().collection('users');  

  const [useremail, setUseremail] = useState('');
  const navigation = useNavigation();
const enviarCodigo = async () => {
  // Gera um código aleatório
  const codigo = Math.floor(Math.random() * 90000) + 10000;

  // Verifica se o campo de e-mail está preenchido
  if (!useremail) {
    alert('Preencha com um e-mail válido!');
    return;
  }

  try {
    //Verifica se existe o email no banco
    const querySnapshot = await usersRef.where('Email', '==', useremail).get();
    
    if (querySnapshot.empty) {
      alert('Email não cadastrado!');
    } 
    //Se existir, ele chama a função para enviar email
    else {
      await enviarNovoEmail(useremail, codigo);
      alert('Código enviado com sucesso!');
    }
  } catch (error) {
    alert('Erro ao enviar código: ' + error.message);
  }
};

  //Direcionamento para o cadastro
  const handleRecSenhaPress = () =>{
    navigation.navigate('Cadastro');
  }


  return (
      <View style={styles.container}>
          <View style={styles.content}>

              <Text>Recuperar minha senha</Text>

               <Text>
                Esqueceu sua senha? Não se preocupe. É só nos dizer seu e-mail que enviaremos um código de acesso para você cadastrar sua nova senha. 
              </Text>

              <Input label="Email" value={useremail} onChangeText={(text) => setUseremail(text)} />
              <Octicons name="mail" style={styles.mail} size={24} color="#063A7A" />

              
              <TouchableOpacity mode="contained" style={styles.botao} onPress={enviarCodigo}>
                  <Text style={styles.Text}>Enviar Código</Text>
              </TouchableOpacity>


              <Text style={{fontWeight: "bold", color: '#063A7A'}}>
                <TouchableOpacity onPress={handleRecSenhaPress}>
                  <Text> Novo membro? registre-se! </Text>
                </TouchableOpacity>
              </Text>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },

  logo: {
    height: 300,
    width: 250,
    marginLeft: 30,
    marginBottom: 30,
    borderRadius: 7
  },

    botao: {
    width: 316,
    height: 60,
    backgroundColor: '#063A7A',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  Text: {
    fontSize: 20,
    paddingTop: 12,
    fontWeight: 700,
    color: '#fff'
  },

  mail: {
    bottom: 38,
    left: 265,
    fontSize: 26
  },

  password: {
    bottom: 38,
    left: 265,
    fontSize: 26
  },

  login: {
    paddingTop: 20,
    fontSize: 12,
    marginLeft: 60,

  },
});


export default recSenha;