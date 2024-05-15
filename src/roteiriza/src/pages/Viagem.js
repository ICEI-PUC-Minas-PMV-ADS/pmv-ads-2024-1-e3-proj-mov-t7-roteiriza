import React from 'react';

import { View, ImageBackground, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { ScrollView, Text } from 'react-native';
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







        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container />
            <TouchableOpacity onPress={this._onPressButton}>
              <Card style={styles.cardMala}>
                <ImageBackground
                  source={require('../assets/Mala-de-viagem.png')}
                  resizeMode="cover"
                  style={styles.mala}
                >
                  <View style={styles.cardContent}>
                    <Text style={styles.cardText}>Sua mala de viagem</Text>
                  </View>
                </ImageBackground>
              </Card>
            </TouchableOpacity>

            <View style={styles.cardsContainer}>
              <TouchableOpacity onPress={this._onPressButton}>
                <Card style={styles.card}>
                  <ImageBackground
                    source={require('../assets/Passagem.png')}
                    resizeMode="cover"
                    style={styles.cardImage}
                    overlayColor="rgba(0, 0, 0, 0.7)" // Gradiente escuro
                  >
                    <View style={styles.cardContent}>
                      <Text style={styles.cardText}>Passagem</Text>
                    </View>
                  </ImageBackground>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._onPressButton}>
                <Card style={styles.card}>
                  <ImageBackground
                    source={require('../assets/Hospedagem.png')}
                    resizeMode="cover"
                    style={styles.cardImage}
                    
                  >
                    <View style={styles.cardContent}>
                      <Text style={styles.cardText}>Hospedagem</Text>
                    </View>
                  </ImageBackground>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._onPressButton}>
                <Card style={styles.card}>
                  <ImageBackground
                    source={require('../assets/Alimentacao.png')}
                    resizeMode="cover"
                    style={styles.cardImage}
                  
                  >
                    <View style={styles.cardContent}>
                      <Text style={styles.cardText}>Alimentação</Text>
                    </View>
                  </ImageBackground>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._onPressButton}>
                <Card style={styles.card}>
                  <ImageBackground
                    source={require('../assets/Passeios.png')}
                    resizeMode="cover"
                    style={styles.cardImage}
                    
                  >
                    <View style={styles.cardContent}>
                      <Text style={styles.cardText}>Passeios</Text>
                    </View>
                  </ImageBackground>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._onPressButton}>
                <Card style={styles.card}>
                  <ImageBackground
                    source={require('../assets/Roteiro.png')}
                    resizeMode="cover"
                    style={styles.cardImage}
                   
                  >
                    <View style={styles.cardContent}>
                      <Text style={styles.cardText}>Roteiro</Text>
                    </View>
                  </ImageBackground>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._onPressButton}>
                <Card style={styles.card}>
                  <ImageBackground
                    source={require('../assets/Emergencia.png')}
                    resizeMode="cover"
                    style={styles.cardImage}
                    
                  >
                    <View style={styles.cardContent}>
                      <Text style={styles.cardText}>Emergência</Text>
                    </View>
                  </ImageBackground>
                </Card>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  card: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    width: 140,
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: 'black',
  },
  cardMala: {
    width: 286,
    height: 130,
    marginLeft: 30,
    marginTop: 15,
  },
  mala: {
    flex: 1,
    width: '100%',
    height: '100%',
    margin: 2,
  },
  cardImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10, 
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default Viagem;