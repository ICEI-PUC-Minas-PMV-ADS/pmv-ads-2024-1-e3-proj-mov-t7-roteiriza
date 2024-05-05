import React from 'react';

import Typography, { TypographyStyles } from '../components/Typography';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

const Usuario = () => {
  return (
    <Container>
      <Header title={'Roteiro'} />

      <Body>
        <Typography style={TypographyStyles.bodyText}>
        Página do Roteiro
        </Typography>
      </Body>
    </Container>
  );
};

export default Usuario;
