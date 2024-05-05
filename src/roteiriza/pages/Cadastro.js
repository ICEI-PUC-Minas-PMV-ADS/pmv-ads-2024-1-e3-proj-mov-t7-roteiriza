import React, { useState } from 'react';
import { StyleSheet, View, Alert, Image, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { Appbar, Text, TextInput, Button } from 'react-native-paper';
import { FontAwesome6, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


import Input from '../components/input';
import {firebase } from '../firebase/config'

export default function AssetExample() {
  const usersRef = firebase.firestore().collection('users');  
  
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const navigation = useNavigation();
 
  //Função de Cadastro
  const CreateUser = () => {
  
  //Primeiro, verificamos se o email já está cadastrado. Então buscamos no banco o email informado.
  usersRef
    .where('Email', '==', useremail)
    .get()
    .then((querySnapshot) => {
      
      //Se houver um email...
      if (!querySnapshot.empty) {
        alert('Email já cadastrado!');
      } 
      
      //Se caso não houver, ele realizará o cadastro
      else if (username.length > 0 && useremail.length > 0 && userpassword.length > 0) {

        //Criando um objeto para passar como parâmetro de criação
        const item = {
          Name: username,
          Email: useremail,
          Password: userpassword      
        };   

        //Realizando a operação no banco, e alterando o valor das variáveis para o padrão
        usersRef
          .add(item)
          .then((docRef) => {
            setUsername('');
            setUserpassword('');
            setUseremail('');

            alert('Cadastro realizado com sucesso!');
            Keyboard.dismiss();

            // Pegando o Id gerado para o usuário
            const userId = docRef.id;
            console.log(userId);

            // Passando o Id como parâmetro para a tela de perfil do usuário
            navigation.navigate('Perfil', { userId: userId });
          })
          .catch((error) => {
            alert(error.message);
          });
      } 
      
      //Se caso os campos estiverem vazios
      else {
        alert('Preencha os campos corretamente!');
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};


  //Função para redirecionar para a tela de login, caso o usuário já tenha uma conta
  const handleLoginPress = () =>{
    navigation.navigate('Login');
  }
    
  return (
    <View style={styles.container}>
      <View style = {styles.content}>
        
        <Image style={styles.logo} source={require('../assets/img.png')} />

        <Input label="Nome completo"  value={username} onChangeText={(Name) => setUsername(Name)}/>
        <FontAwesome6 name="circle-user" style={styles.user} size={24} color="#063A7A" />

        <Input label="Email" value={useremail} onChangeText={(Email) => setUseremail(Email)}/>
        <Octicons name="mail" style={styles.mail} size={24} color="#063A7A" />

        <Input label="Senha" secureTextEntry={true} value={userpassword} onChangeText={(Password) => setUserpassword(Password)}/>
        <Octicons name="lock" style={styles.password} size={24} color="#063A7A" />

        <TouchableOpacity mode="contained" style={styles.botao} onPress={CreateUser}>
          <Text style={styles.Text}>Cadastre-se</Text>
        </TouchableOpacity>


       <Text style={styles.login}>
        Já tem uma conta?   
          <TouchableOpacity onPress={handleLoginPress}>
            <Text> Faça seu login! </Text>
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
    paddingTop: 10,
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
  logo: {
    height: 250,
    width: 250,
    marginLeft: 30,
    marginBottom: 25,
    borderRadius: 7
  },

});
