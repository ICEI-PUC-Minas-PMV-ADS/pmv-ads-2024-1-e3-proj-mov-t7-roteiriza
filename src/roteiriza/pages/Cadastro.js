import React, { useState } from 'react';
import { StyleSheet, View, Alert, Image, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { Appbar, Text, TextInput, Button } from 'react-native-paper';
import { FontAwesome6, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


import Input from '../components/Input';
import {firebase } from '../firebase/config'
import Perfil from './perfil'

export default function AssetExample() {
  const usersRef = firebase.firestore().collection('users');  
  
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const navigation = useNavigation();
 
  const CreateUser = () => {

    
    if(username.length > 0 && useremail.length > 0  && userpassword.length > 0){
      const item = {
        Name: username,
        Email: useremail,
        Password: userpassword      
      }   

      usersRef
      .add(item)
      .then((docRef)=>{
        setUsername('');
        setUserpassword('');
        setUseremail('');

        alert('Cadastro realizado com sucesso!');
        Keyboard.dismiss();

        //Pegando o Id gerado
        const userId = docRef.id;
        console.log(userId)

        //Passando como parametro para a tela de perfil :)
        navigation.navigate('Perfil', {userId: userId})
      })
      .catch((error)=>{
          alert (error.message);
      })
    }
    else {
      alert('Preencha os campos corretamente!')
    }
    
  }
  
    
  return (
    <View style={styles.container}>
      <View style = {styles.content}>

        <TextInput label="Nome completo"  value={username} onChangeText={(Name) => setUsername(Name)}/>
        <FontAwesome6 name="circle-user" style={styles.user} size={24} color="#063A7A" />

        <TextInput label="Email" value={useremail} onChangeText={(Email) => setUseremail(Email)}/>
        <Octicons name="mail" style={styles.mail} size={24} color="#063A7A" />

        <TextInput label="Senha" secureTextEntry={true} value={userpassword} onChangeText={(Password) => setUserpassword(Password)}/>
        <Octicons name="lock" style={styles.password} size={24} color="#063A7A" />

        <TouchableOpacity mode="contained" style={styles.button} onPress={CreateUser}>
          <Text style={styles.Text}>Cadastre-se</Text>
        </TouchableOpacity>
        <Text style={styles.login}>Já tem uma conta? <Text style={{fontWeight: "bold", color: '#063A7A'}} >Faça seu login</Text></Text>
      </View>
    </View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
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

  user: {
    bottom: 38,
    left: 264,
    fontSize: 26
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
