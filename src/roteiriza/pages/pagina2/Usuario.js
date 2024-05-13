import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import Typography, { TypographyStyles } from '../../components/Typography';
import Header from '../../components/Header';
import Container from '../../components/Container';
import Body from '../../components/Body';

const Usuario = () => {
  const [text, setText] = useState('');

  return (
    <Container>
      <Header title={'Perfil do usuário'} />

      <Body>
        

        <View style={styles.introducao}>
          <Typography style={TypographyStyles.headerTitle}>
            Olá! $nome_user,
          </Typography>
          <Typography style={TypographyStyles.bodyText}>
            Confira abaixo suas informações de cadastro.
          </Typography>
        </View>

        <View style={styles.inputBox}>
          <Typography style={TypographyStyles.inputTextHighlighted}>
            E-mail de cadastro
          </Typography>

          <TextInput
            label="Insira seu e-mail"
            value={text}
            onChangeText={(text) => setText(text)}
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
            value={text}
            onChangeText={(text) => setText(text)}
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
            Quer mudar de senha?{' '}
            <Typography style={TypographyStyles.bodyTextHighlighted}>
              Redefina agora
            </Typography>
          </Typography>
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
    marginBottom: 40,
  },
  input: {
    fontSize: 15,
    marginVertical: 5,
  },
});

export default Usuario;
