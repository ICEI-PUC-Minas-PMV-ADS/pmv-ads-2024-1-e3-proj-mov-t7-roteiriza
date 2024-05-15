import React from 'react';

import Typography, { TypographyStyles } from '../components/Typography';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import { Card } from 'react-native-paper';
import CheckboxForm from '../components/CheckboxForm';


import { Text } from 'react-native';

const Usuario = () => {
  return (
    <Container>
      <Header title={'Mala de viagem'} />

      <Body>
      
        <Card>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        </Card>
        <Typography style={TypographyStyles.bodyText}>
        Adicione abaixo os itens que você deseja levar para sua viagem e monte um checklist!
        </Typography>
      <CheckboxForm />
      </Body>

    </Container>
  );
};

export default Usuario;
