import React, { useState } from 'react';
import { StyleSheet, View, Alert, Image, Dimensions } from 'react-native';
import { Appbar, Text, TextInput, Button } from 'react-native-paper';
import { FontAwesome6, Octicons } from '@expo/vector-icons';

import Input from '../components/Input';
import {login, createUser, getUsuario} from '../service/UsuarioService';


const Login = () => {

    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
   
    login(useremail, password).then((dados) => {
    console.log(dados); 
    console.log("Logando:", useremail);
    });


    const loginClick = () => {
        login (useremail, password);
    }

    return (
    <View style={styles.container}>
      <View style = {styles.content}>
        <Image style={styles.logo} source={require('../assets/roteirizaLogo.png')} />


        <Input label="Email" value={useremail} onChange={(e) => setUseremail(e.target.value)}/>
        <Octicons name="mail" style={styles.mail} size={24} color="#063A7A" />

        <Input label="Senha" value={password} secureTextEntry={true} onChange={(e) => setPassword(e.target.value)}/>
        <Octicons name="lock" style={styles.password} size={24} color="#063A7A" />

        <Button mode="contained" style={styles.button} onClick={loginClick}>
          <Text style={styles.Text}>Login</Text>
        </Button>
        <Text style={styles.login}>Esqueceu sua senha? <Text style={{fontWeight: "bold", color: '#063A7A'}} >Recuperar senha</Text></Text>

      </View>
    </View>
    )
    

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

  button: {
    width: 316,
    height: 60,
    backgroundColor: '#063A7A',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginTop: 80
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
})
}

export default login;