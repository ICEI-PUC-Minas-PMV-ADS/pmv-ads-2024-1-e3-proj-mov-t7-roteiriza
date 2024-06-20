import React from 'react';

import Typography, { TypographyStyles } from '../../components/Typography';
import Header from '../../components/Header';
import Container from '../../components/Container';
import Body from '../../components/Body';

const Home = () => {
  return (
    <Container>
      <Header title={'Olá! $nome_user,'} />

      <Body>
        <Typography style={TypographyStyles.bodyText}>
        Qual viagem você quer organizar agora?
        </Typography>
      </Body>
    </Container>
  );
};

export default Home;
