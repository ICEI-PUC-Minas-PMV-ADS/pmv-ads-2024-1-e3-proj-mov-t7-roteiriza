import React from 'react';

import Typography, { TypographyStyles } from '../components/Typography';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

const Usuario = () => {
  return (
    <Container>
      <Header title={'Mala de viagem'} />

      <Body>
        <Typography style={TypographyStyles.bodyText}>
        Adicione abaixo os itens que você deseja levar para sua viagem e monte um checklist!
        </Typography>
      </Body>
    </Container>
  );
};

export default Usuario;
