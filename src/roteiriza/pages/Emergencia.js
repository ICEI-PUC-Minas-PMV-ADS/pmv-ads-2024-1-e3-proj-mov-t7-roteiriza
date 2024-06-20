import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/button';
import { Background } from '../components/ContainerTitle';
import ContainerEmergencia from '../components/ContainerEmergencia';

import { useRoute } from '@react-navigation/native';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from '@firebase/firestore';
import { firestore } from '../firebase/config';

const Emergencia = ({userId}) => {

  const route = useRoute();
  const { viagemId } = route.params;


  const [enderecoHosp, setEnderecoHosp] = useState('');
  const [numeroBombeiro, setNumeroBombeiro] = useState('');
  const [numeroSamu, setNumeroSamu] = useState('');
  const [numeroPolicia, setNumeroPolicia] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [dadoOnStore, setDadoOnStore ] = useState(false);
  const [documentId, setDocumentId] = useState('');




  useEffect(() => {
    if (!isLoaded) {
      loadEmergencia();
    }
  }, [isLoaded, viagemId]);

  const loadEmergencia = async () => {
    if (!isLoaded) {
      try {
        const emergenciaCollectionRef = collection(firestore, 'emergencia');
        const q = query(emergenciaCollectionRef, where('viagemId', '==', viagemId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          const doc = querySnapshot.docs[0].data();

          setEnderecoHosp(doc.EnderecoHosp);
          setNumeroBombeiro(doc.Numero_Bombeiro);
          setNumeroSamu(doc.Numero_Samu);
          setNumeroPolicia(doc.Numero_Policia);    
          setIsLoaded(true);
          setDocumentId(docSnapshot.id);


          setDadoOnStore(true)

        } else {
          console.log('Sem emergência cadastradas');
        }
      } catch (error) {
        console.log('Ocorreu um erro: ', error);
      }
    } else {
      console.log('Os dados já foram carregados');
    }
  };

  const saveEmergencia = async () => {

    const emerRef = collection(firestore, 'emergencia');

      let dadosEmer = {
        EnderecoHosp: enderecoHosp,
        Numero_Bombeiro: numeroBombeiro,
        Numero_Samu: numeroSamu,
        Numero_Policia: numeroPolicia,
        userId: userId,
        viagemId: viagemId

      };

      try {
        console.log(dadoOnStore)
        
        if (dadoOnStore == false){
          await addDoc(emerRef, dadosEmer);
          alert('Cadastro de emergência realizado com sucesso!');
        }

        if(dadoOnStore == true) {
           
          const docRef = doc(firestore, 'emergencia', documentId);

          await updateDoc(docRef, {         
            EnderecoHosp: enderecoHosp,
            Numero_Bombeiro: numeroBombeiro,
            Numero_Samu: numeroSamu,
            Numero_Policia: numeroPolicia        
          });

        }

      } catch (error) {
        console.log("Ocorreu um erro ao salvar no banco de dados!", error);
        alert("Ocorreu um erro ao salvar!");
      }
    
  };




    



  return (
    <Background style={styles.container} colors={['#ffff', '#ffff']}>
      <View style={styles.container_main}>
        <ContainerEmergencia titleText={"HOSPITAL:"} subText={"Endereço:"} placeHolderText={"Av.Francisco Sales"} value={enderecoHosp} onChangeText={setEnderecoHosp}/>

        <ContainerEmergencia titleText={"CORPO DE BOMBEIROS:"} subText={"Telefone:"} placeHolderText={"193"} value={numeroBombeiro} onChangeText={setNumeroBombeiro}/>

        <ContainerEmergencia titleText={"SAMU:"} subText={"Telefone:"} placeHolderText={"192"} value={numeroSamu} onChangeText={setNumeroSamu}/>

        <ContainerEmergencia titleText={"POLÍCIA:"} subText={"Telefone:"} placeHolderText={"190"} value={numeroPolicia} onChangeText={setNumeroPolicia}/>

        <Button color={"#F5BD60"} textButton={"SALVAR"} onpress={saveEmergencia}/>
      </View>
    </Background>
  );
}

export default Emergencia;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10
  },
  container_main: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    width: '100%',
    height: 650,
  }

});