import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Linking, Text, ScrollView  } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


import Typography, { TypographyStyles } from '../components/Typography';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

import { firestore } from '../firebase/config';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc} from '@firebase/firestore';


const Home = ({ user, handleAuthentication, userId, objectUser }) => {

  const navigation = useNavigation(); 

  const [UserName, setUserName] = useState('');
  const [ListViagem, setListViagem] = useState([]);

  useEffect(() => {
   
    if (user && objectUser) {
      setUserName(objectUser.Name);
      listViagem();
    } else {
      console.log('Erro ao passar dados');
    }
  }, [user, objectUser]);

  useFocusEffect(
    React.useCallback(() => {
      listViagem();
    }, [])
  );
  const images = [
    require('../assets/imgRandom/Viagem-01.png'),
    require('../assets/imgRandom/Viagem-02.png')
  ];

  const listViagem = async () => {
    
    try {
      const q = query(collection(firestore, 'viagem'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {

        const docSnap = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
        
        setListViagem(docSnap);

      } else {
        console.log('Sem viagens cadastradas');
        setListViagem([]);
      }
    } catch (error) {
      console.log('Ocorreu um erro: ', error);
    }
  };

  const handlePressEdit = (viagemId) => {
    navigation.navigate('Atualizar Viagem', {viagemId})
  };

  const handlePressDelete = async (viagemId) => {
    try{
      await deleteDoc(doc(firestore, 'viagem', viagemId));
      
      //Exclusão de Objetos associados a viagem
      try { 

        //Exclusão de Mala de viagem
        const queryBagagens = query(collection(firestore, 'bagagens'), where('viagemId', '==', viagemId));
        const querySnapshotBagagegns = await getDocs(queryBagagens);

        if (!querySnapshotBagagegns.empty) {
          querySnapshotBagagegns.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        }
        
        //Exclusão de Passeios
        const queryPasseios = query(collection(firestore, 'passeios'), where('viagemId', '==', viagemId));
        const querySnapshotPasseios = await getDocs(queryPasseios);

        if (!querySnapshotPasseios.empty) {
          querySnapshotPasseios.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        }

        //Exclusão de Alimentação
        const queryAlimentacao = query(collection(firestore, 'alimentacao'), where('viagemId', '==', viagemId));
        const querySnapshotAlimentacao = await getDocs(queryAlimentacao);

        if (!querySnapshotAlimentacao.empty) {
          querySnapshotAlimentacao.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        }

        //Exclusão de Hospedagem
        const queryHospedagem = query(collection(firestore, 'hospedagem'), where('viagemId', '==', viagemId));
        const querySnapshotHospedagem = await getDocs(queryHospedagem);

        if (!querySnapshotHospedagem.empty) {
          const docRef = querySnapshotHospedagem.docs[0].ref;
          await deleteDoc(docRef);
        }

        //Exclusão de Passagem
        const queryPassagem = query(collection(firestore, 'passagem'), where('viagemId', '==', viagemId));
        const querySnapshotPassagem = await getDocs(queryPassagem);

        if (!querySnapshotPassagem.empty) {
          const docRef = querySnapshotPassagem.docs[0].ref;
          await deleteDoc(docRef);
        }

        //Exclusão de Emergencia
        const queryEmergencia = query(collection(firestore, 'emergencia'), where('viagemId', '==', viagemId));
        const querySnapshotEmergencia = await getDocs(queryEmergencia);

        if (!querySnapshotEmergencia.empty) {
          const docRef = querySnapshotEmergencia.docs[0].ref;
          await deleteDoc(docRef);
        }

      } catch (error) {
        console.log('Ocorreu um erro ao tentar excluir demais objetos', error)
      }

      listViagem();
    }
    catch(error){
      console.log('Ocorreu um erro ao tentar excluir viagem!', error)
    }
  };

  const handleApontador = (viagemId) => {
    navigation.navigate('Minha Viagem', {viagemId})
  }
   
  return (
    <Container style={styles.container}>
        <View style={styles.header}>
          <Text style={TypographyStyles.headerTitle}>Olá, {UserName}!</Text>
          <Text style={TypographyStyles.bodyText}>Qual viagem você quer organizar agora?</Text>
        </View>
      <Body>
        <ScrollView>
          <View style={styles.travelBoxes}>
            
            {ListViagem.length > 0 ? (
              ListViagem.map((viagem, index) => (
                
                <View key={index} style={styles.viagemContainer}>
                  {viagem.img !== undefined && (
                  <TouchableOpacity onPress={() => {handleApontador(viagem.id)}}>
                    <Image
                      style={styles.viagem_01}
                      source={images[viagem.img]} 
                    />
                  </TouchableOpacity>
                  )}
                  
                  <View style={styles.boxInfoViagem}>
                    <View>
                      <Typography style={TypographyStyles.subHeaderTitle}>
                        {viagem.Destino_Viagem}
                      </Typography>
                      <Typography style={TypographyStyles.bodyText}>
                        {viagem.DataInicio_Viagem} | {viagem.DataFinal_Viagem}
                      </Typography>
                    </View>
                    <View style={styles.alignIcons}>
                      <TouchableOpacity onPress={() => {handlePressEdit(viagem.id)}}>
                        <Image
                          style={styles.icons}
                          source={require('../assets/edit.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() =>{handlePressDelete(viagem.id)}}>
                        <Image
                          style={styles.icons}
                          source={require('../assets/delete.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Typography style={TypographyStyles.bodyText}>
                Nenhuma viagem cadastrada.
              </Typography>
            )}
          </View>
        </ScrollView>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    height: 80,
    gap: 5,
    paddingLeft: 40,
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