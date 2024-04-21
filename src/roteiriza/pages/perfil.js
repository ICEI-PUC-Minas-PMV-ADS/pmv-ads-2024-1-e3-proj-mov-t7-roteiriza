import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';


import {firebase} from '../firebase/config'
import Typography, { TypographyStyles } from '../components/Typography';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';




const Perfil = ({ route }) => {
  const usersRef = firebase.firestore().collection('users');  

  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const navigation = useNavigation();

  //Read
  useEffect (()=>{

    const readUserDetails = async () =>{
      try {
        const userId = route.params.userId
        const usersRef = firebase.firestore().collection('users').doc(userId)
        const snapshot = await usersRef.get();

        if (snapshot.exists){
          const userData = snapshot.data();
          setUserData(userData);
          setUsername(userData.Name);
          setUseremail(userData.Email);
          setUserpassword(userData.Password);

        }
        else {
          alert('Usuario não encontrado')
        }
      }
      catch(error){
        console.error('Erro ao procurar o usuário!', error)
      }
    };

    readUserDetails();
  }, [route.params]);

  //Update
  const updateUser = () =>{

    console.log(username, useremail, userpassword)
       
      usersRef
        .doc(route.params.userId)
        .update({
          Name: username,
          Email: useremail,
          Password: userpassword
        })
        .then(() => {
          navigation.navigate('Cadastro');

         alert('Dado atualizado com sucesso!')    
        })
      .catch((error) => {
        alert(error.message);
      });       
  }
  //Delete
  const deleteUser = () => {

    usersRef
      .doc(route.params.userId)
      .delete()
      .then(() => {    
      alert('Usuario apagado com sucesso!')})
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <Container>
      <Header title={'Perfil do usuário'} />

      <Body>
        <Typography style={TypographyStyles.bodyText}>
        <FontAwesome
                name="trash-o"
                color="red"
                onPress={() => deleteUser()}
                style={styles.todoIcon}
              />
           <TextInput
            style={styles.textfield}
            onChangeText={setUsername}
            value={username}
          />    
           <TextInput
            style={styles.textfield}
            onChangeText={setUseremail}
            value={useremail}
          />
          <TextInput
            style={styles.textfield}
            onChangeText={setUserpassword}
            value={userpassword}
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.buttonUpdate}
            onPress={() => {
              updateUser();
            }}>
            <Text>ATUALIZAR</Text>
          </TouchableOpacity>
        </Typography>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonUpdate: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: '#0de065',
  },
  todoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
});
 
export default Perfil;
