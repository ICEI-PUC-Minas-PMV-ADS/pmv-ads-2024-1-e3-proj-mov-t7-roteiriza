import React from 'react';

import { View, ImageBackground, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Card } from 'react-native-paper';
import Typography, { TypographyStyles } from '../components/Typography';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

const Viagem = () => {
  const handlePressMala = () => {
    Linking.openURL('#'); //ADICIONAR LINK
  };
  const handlePressPassagem = () => {
    Linking.openURL('#'); //ADICIONAR LINK
  };
  const handlePressHospedagem = () => {
    Linking.openURL('#'); //ADICIONAR LINK
  };
  const handlePressAlimentação = () => {
    Linking.openURL('#'); //ADICIONAR LINK
  };
  const handlePressPasseios = () => {
    Linking.openURL('#'); //ADICIONAR LINK
  };
  const handlePressRoteiro = () => {
    Linking.openURL('#'); //ADICIONAR LINK
  };
  const handlePressEmergência = () => {
    Linking.openURL('#'); //ADICIONAR LINK
  };


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







        <View style={styles.cardsContainer}>
          <TouchableOpacity onPress={handlePressMala}>
            <Card>
              <ImageBackground
                source={require('../assets/Mala-de-viagem.png')}
                style={styles.imagemMala}>
            
                <View style={styles.cardContent}>
                <Typography style={TypographyStyles.cardText}>
                Sua mala de viagem
                </Typography>
                </View>
              </ImageBackground>
            </Card>
          </TouchableOpacity>
        </View>

      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  imagemMala: {
    width: 330,
    height: 150,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15,
  },
});

export default Viagem;
