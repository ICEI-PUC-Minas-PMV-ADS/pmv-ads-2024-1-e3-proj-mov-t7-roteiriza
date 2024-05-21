import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { firestore } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const Perfil = ({ userId }) => {
  const [username, setUsername] = useState('');
  const [useremail, setUserEmail] = useState('');
  const [userpassword, setUserPassword] = useState('');

  useEffect(() => {
    const readUserDetails = async () => {
      try {
        console.log(userId)
        const userRef = doc(firestore, 'users', userId);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists) {
          const userData = snapshot.data();
          setUsername(userData.Name);
          setUserEmail(userData.Email);
          setUserPassword(userData.Senha);
        } else {
          console.log('Usuário não encontrado');
        }
      } catch (error) {
        console.log('Ocorreu um erro ao resgatar os dados! ', error);
      }
    };

    readUserDetails();
  }, [userId]); 

  // Log dos dados do usuário
  console.log(username, useremail, userpassword);

  return (
    <View style={styles.container}>
      <Text>Nome: {username}</Text>
      <Text>Email: {useremail}</Text>
      <Text>Senha: {userpassword}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Perfil;
