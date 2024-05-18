import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Typography, { TypographyStyles } from '../components/Typography';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

const Home = (user,  handleAuthentication, userId, objectUser) => {

    const [nameUser, setNameUser] = useState('');
    
    useEffect(() => {
        

        console.log(userId)


      }, [user]);  





  const handlePressEdit = () => {
    Linking.openURL('#'); //ADICIONAR O LINK DE EDIÇÃO
  };
  const handlePressDelete = () => {
    Linking.openURL('#'); //ADICIONAR O LINK DE REMOÇÃO
  };

  return (
    <Container>
      <Header title={'Olá! $nome_user,'} />
      <Body>
        <View style={styles.introducao}>
          <Typography style={TypographyStyles.bodyText}>
            Qual viagem você quer organizar agora?
          </Typography>
        </View>
        <View style={styles.travelBoxes}>
          <View>
            <Image
              style={styles.viagem_01}
              source={require('../assets/Viagem-01.png')}
            />
            <View style={styles.boxInfoViagem}>
              <View>
                <Typography style={TypographyStyles.subHeaderTitle}>
                  Rio de Janeiro
                </Typography>
                <Typography style={TypographyStyles.bodyText}>
                  16 de janeiro | 22 de janeiro
                </Typography>
              </View>
              <View style={styles.alignIcons}>
                <TouchableOpacity onPress={handlePressEdit}>
                  <Image
                    style={styles.icons}
                    source={require('../assets/edit.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressDelete}>
                  <Image
                    style={styles.icons}
                    source={require('../assets/delete.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <Image
              style={styles.viagem_02}
              source={require('../assets/Viagem-02.png')}
            />
            <View style={styles.boxInfoViagem}>
              <View>
                <Typography style={TypographyStyles.subHeaderTitle}>
                  São Paulo
                </Typography>
                <Typography style={TypographyStyles.bodyText}>
                  20 de julho | 25 de julho
                </Typography>
              </View>
              <View style={styles.alignIcons}>
                <TouchableOpacity onPress={handlePressEdit}>
                  <Image
                    style={styles.icons}
                    source={require('../assets/edit.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressDelete}>
                  <Image
                    style={styles.icons}
                    source={require('../assets/delete.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  introducao: {
    marginBottom: 40,
  },

  travelBoxes: {
    gap: 50,
  },

  viagem_01: {
    width: '100%',
    height: 150,
    marginBottom: 20,
  },

  viagem_02: {
    width: '100%',
    height: 150,
    marginBottom: 20,
  },

  boxInfoViagem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  alignIcons: {
    flexDirection: 'row',
    gap: 10,
  },

  icons: {
    width: 30,
    height: 30,
  },
});

export default Home;