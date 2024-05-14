import React from 'react';

import Typography, { TypographyStyles } from '../components/Typography';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

const NovaViagem = () => {

  return (
      <Container>
        <Header title={'Roteirize sua Viagem'} />

        <Body>
          <Typography style={TypographyStyles.bodyText}>
          Adicione informações sobre o seu roteiro, hospedagem, alimentação, organização da mala e muito mais.
          </Typography>
        </Body>
      </Container>
  );
};

export default NovaViagem;
