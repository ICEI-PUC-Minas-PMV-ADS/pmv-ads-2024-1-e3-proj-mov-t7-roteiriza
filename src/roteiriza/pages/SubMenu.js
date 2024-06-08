import React, {useState, useEffect} from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { ScrollView, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';

import { firestore } from '../firebase/config';
import { collection, addDoc, query, where, getDoc, deleteDoc, doc} from '@firebase/firestore';

import Typography, { TypographyStyles } from '../components/Typography';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

const SubMenu = ({ user, handleAuthentication, userId, objectUser, type }) => {
  const navigation = useNavigation(); 

  const [UserName, setUserName] = useState('');
  const [ DestinoUser,setDestinoUser] = useState('');

  const route = useRoute();
  const { viagemId } = route.params;

  useEffect(() => {
    if (user && objectUser) {
        
      setUserName(objectUser.Name);
      carregar();
    } else {
      console.log('Erro ao passar dados');
    }
  }, [user, objectUser]);

    
  const carregar = async () => {
    try {
        const docRef = doc(firestore, 'viagem', viagemId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDestinoUser(data.Destino_Viagem);

        } else {
          console.log('Sem viagens cadastradas');
        }

      } catch (error) {
        console.log('Ocorreu um erro: ', error);
      }
  }
 
  const handlePressHospedagem = () => {
    navigation.navigate('Hospedagem', {viagemId})
  };

  const handlePressAlimentacao = () => {
    navigation.navigate('Alimentação', {viagemId})
  };
  
  const handlePressPasseios = () => {
    navigation.navigate('Meus Passeios', {viagemId})
  };

  const handlePressEmergencia = () => {
    navigation.navigate('Emergencia', {viagemId})
  };


  const handlePressPassagem = () => {
    navigation.navigate('Passagem', {viagemId})
  }

  const handlePressRoteiro = () => {
    navigation.navigate('Roteiro', {viagemId})
  }

  const handlePressBagagem = () => {
    navigation.navigate('Bagagem', {viagemId})
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={TypographyStyles.headerTitle}>Olá, {UserName}!</Text>
          <Text style={TypographyStyles.bodyText}>Tudo sobre sua viagem para {DestinoUser}</Text>
        </View>

        <TouchableOpacity style={styles.malaViagemContainer} onPress={handlePressBagagem}>
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
          <TouchableOpacity onPress={handlePressPassagem}>
            <Card style={styles.card}>
              <ImageBackground
                source={require('../assets/Passagem.png')}
                resizeMode="cover"
                style={styles.cardImage}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>Passagem</Text>
                </View>
              </ImageBackground>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressHospedagem}>
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

          <TouchableOpacity onPress={handlePressAlimentacao}>
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

          <TouchableOpacity onPress={handlePressPasseios}>
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

          <TouchableOpacity onPress={handlePressRoteiro}>
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

          <TouchableOpacity onPress={handlePressEmergencia}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  malaViagemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    marginHorizontal: 5,
    marginVertical: 5,
    marginTop: 10,
    width: 170,
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: 'black',
  },
  cardMala: {
    width: 345,
    height: 155,
    marginTop: 10,
  },
  mala: {
    width: '100%',
    height: '100%',
  },
  cardImage: {
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
  header: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 40,
    height: 60,
    marginTop: 20,
    gap: 5,
  },
});

export default SubMenu;