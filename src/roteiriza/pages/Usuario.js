import React from 'react';

import Typography, { TypographyStyles } from '../components/Typography';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

import { Text } from 'react-native';

const Usuario = () => {
  return (
    <Container>
      <Header title={'Perfil do usuário'} />

      <Body>
        <Typography style={TypographyStyles.bodyText}>
        Página do Usuário
        </Typography>
      </Body>
    </Container>
  );
};

export default Usuario;
