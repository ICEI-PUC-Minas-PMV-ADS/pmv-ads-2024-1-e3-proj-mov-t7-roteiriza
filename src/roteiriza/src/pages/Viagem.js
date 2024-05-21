import React from 'react';

import Typography, { TypographyStyles } from '../components/Typography';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

const Viagem = () => {

  return (
      <Container>
        <Header title={'Olá! $name_user,'} />

        <Body>
          <Typography style={TypographyStyles.bodyText}>
            Tudo da sua viagem para{' '}
            <Typography style={TypographyStyles.bodyTextHighlighted}>
              $name_travel
            </Typography>
          </Typography>
          <Typography style={TypographyStyles.bodyText}>
            O valor final da sua viagem é de{' '}
            <Typography style={TypographyStyles.bodyTextHighlighted}>
              $travel_value
            </Typography>
          </Typography>
        </Body>
      </Container>
  );
};

export default Viagem;
