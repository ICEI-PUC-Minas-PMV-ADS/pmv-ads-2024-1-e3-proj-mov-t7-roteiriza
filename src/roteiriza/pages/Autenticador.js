import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Octicons, FontAwesome6} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';


import Container from '../components/Container';
import Typography from '../components/Typography';

const Autenticador = ({name, setName, email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {

  const navigation = useNavigation();


  let logoSource = isLogin ? require('../assets/roteirizaLogo.png') : require('../assets/logo.png');

  const handleForgotPassword = () =>{
    navigation.navigate('recSenha');
  }

  return (
    <Container>
      <View style={styles.imgContainer}>
        <Image source={logoSource} />
      </View>

      {!isLogin && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            autoCapitalize="none"
            inlineImageRight="circle-user"

          />
          <FontAwesome6 name="circle-user" style={styles.userIcon} size={24} color="#063A7A" />
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          inlineImageRight="mail"
        />
        <Octicons name="mail" style={styles.mailIcon} size={24} color="#063A7A" />

      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          secureTextEntry
          inlineImageRight="lock"

        />
        <Octicons name="lock" style={styles.passwordIcon} size={24} color="#063A7A" />
      </View>

      {isLogin && (
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.toggleText}>Esqueceu sua senha? Redefina agora</Text>
        </TouchableOpacity>
      )}

      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleAuthentication}>
            <Text style={{ color: '#fff' }}>{isLogin ? 'Entrar' : 'Cadastre-se'}</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Novo membro? Registre-se' : 'Já tem uma conta? Faça seu login!'}
        </Text>
      </View>
    
    </Container>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
    width: 300,

  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#063A7A',
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
  },
  userIcon: {
    position: 'absolute',
    right: 10,
  },
  mailIcon: {
    position: 'absolute',
    right: 10,
  },
  passwordIcon: {
    position: 'absolute',
    right: 10,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
    
  },
  buttonStyle:{
    height: 50,
    width: 240,
    backgroundColor: '#063A7A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,

  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
});
export default Autenticador;
