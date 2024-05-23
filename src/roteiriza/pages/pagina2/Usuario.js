import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


import Typography, { TypographyStyles } from '../../components/Typography';
import Header from '../../components/Header';
import Container from '../../components/Container';
import Body from '../../components/Body';

const Usuario = ( {user, handleAuthentication, objectUser }) => {

  const navigation = useNavigation(); 

  const [text, setText] = useState('');
  const [EmailUser, setEmailUser] = useState('');
  const [PasswordUser, setPasswordUser] = useState('');

  useEffect(() => {
    if (user) {
      setEmailUser(objectUser.Email);
      setPasswordUser(objectUser.Senha);
    }
  }, [user]);

  const handleApontamento = (user) => {
      navigation.navigate('Esqueci minha senha', {user})
  }

  return (
    <Container>
      <Header title={'Perfil do usuário'} />

      <Body>
        <Image
            style={styles.logo}
            source={require('../../assets/Roteiriza-Perfil-Usuario.png')}
        />

  

        <View style={styles.inputBox}>
          <Typography style={TypographyStyles.inputTextHighlighted}>
            E-mail de cadastro
          </Typography>

          <TextInput
            label="Insira seu e-mail"
            value={EmailUser}
            onChangeText={setEmailUser}
            mode="outlined"
            outlineColor="#CACACA"
            style={styles.input}
            theme={{
              colors: {
                primary: '#063A7A',
                background: '#ECECEC',
              },
            }}
          />

          <Typography style={TypographyStyles.bodyText}>
            Quer mudar de e-mail?{' '}
            <Typography style={TypographyStyles.bodyTextHighlighted}>
              Redefina agora
            </Typography>
          </Typography>
        </View>

        <View style={styles.inputBox}>
          <Typography style={TypographyStyles.inputTextHighlighted}>
            Senha cadastrada
          </Typography>

          <TextInput
            label="Insira sua senha"
            value={PasswordUser}
            onChangeText={setPasswordUser}
            mode="outlined"
            outlineColor="#CACACA"
            secureTextEntry
            style={styles.input}
            theme={{
              colors: {
                primary: '#063A7A',
                background: '#ECECEC',
              },
            }}
          />
          
          <TouchableOpacity onPress={handleApontamento}>
            <Typography style={TypographyStyles.bodyText}>
              Quer mudar de senha?{' '}
              <Typography style={TypographyStyles.bodyTextHighlighted}>
                Redefina agora
              </Typography>
            </Typography>
          </TouchableOpacity>
          <View style={styles.logout}>
          <Button  title="Logout" onPress={handleAuthentication} color="#e74c3c" />
          </View>
        </View>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 40,
    marginTop: 10,
  },
  introducao: {
    marginBottom: 40,
  },
  inputBox: {
    marginBottom: 30,
  },
  input: {
    fontSize: 15,
    marginVertical: 5,
  },
  logout: {
    marginTop: 20,
  }
});

export default Usuario;
