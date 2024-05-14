import React from 'react';

import Typography, { TypographyStyles } from '../components/Typography';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

const Login = () => {
  return (
    <Container>
      <Header title={'Login'} />

      <Body>
        <Typography style={TypographyStyles.bodyText}>
        Página de Login
        </Typography>
      </Body>
    </Container>
  );
};

export default Login;
