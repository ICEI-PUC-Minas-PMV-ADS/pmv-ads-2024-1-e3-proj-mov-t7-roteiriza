import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Input from '../components/input';
import {firebase } from '../firebase/config';


const Login = () => {
  const usersRef = firebase.firestore().collection('users');  

  const [useremail, setUseremail] = useState('');
  const [userpassword, setPassword] = useState('');
  const navigation = useNavigation();

  //Realizando o Login
 const loginClick = () => {
  // Verificando se os campos estão vazios
  if (!useremail || !userpassword) {
    alert('Preencha os campos de email e senha!');
    return; 
  }

  usersRef
    .where('Email', '==', useremail)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        alert('Email não cadastrado!');
      } else {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();

          if (userData.Password === userpassword) {
            alert('Login bem sucedido!');
            
          } else {
            alert('Senha incorreta!');
          }
        });
      }
    })
    .catch((error) => {
      console.error('Erro ao realizar login:', error);
      alert('Ocorreu um erro ao realizar o login. Por favor, tente novamente mais tarde.');
    });
};


  //Recuperação de Senha
  const handleRecSenhaPress = () =>{
    navigation.navigate('recSenha');
  }


  return (
      <View style={styles.container}>
          <View style={styles.content}>
              <Image style={styles.logo} source={require('../assets/roteirizaLogo.png')} />

              <Input label="Email" value={useremail} onChangeText={(text) => setUseremail(text)} />
              <Octicons name="mail" style={styles.mail} size={24} color="#063A7A" />

              <Input label="Senha" value={userpassword} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
              <Octicons name="lock" style={styles.password} size={24} color="#063A7A" />

              <TouchableOpacity mode="contained" style={styles.botao} onPress={loginClick}>
                  <Text style={styles.Text}>Login</Text>
              </TouchableOpacity>


              <Text style={{fontWeight: "bold", color: '#063A7A'}}>
                <TouchableOpacity onPress={handleRecSenhaPress}>
                  <Text>Esqueceu sua senha? Recuperar senha! </Text>
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


export default Login;