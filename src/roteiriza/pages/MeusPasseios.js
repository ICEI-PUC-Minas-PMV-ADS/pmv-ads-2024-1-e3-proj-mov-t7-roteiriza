import React, { useState } from 'react';
import {Text, View, Image, ScrollView, StyleSheet} from 'react-native';
import  Header  from '../components/Header'
import ContainerPasseios from '../components/containerPasseios'
import Button from '../components/buttonAdicionar';

import { useRoute } from '@react-navigation/native';
import ListaAdicionada from '../components/listaAdicionada';
import ImageLista from '../components/imageLista';

const MeusPasseios = ({userId}) => {

    const route = useRoute();
    const { viagemId } = route.params;
    
    const [ListPasseios, setListPasseios] = useState([]);

    const loadPasseios = async () => {

        try {
            const q = query(collection(firestore, 'passeios'), where('viagemId', '==', viagemId));
            const querySnapshot = await getDocs(q);
      
            if (!querySnapshot.empty) {
      
              const docSnap = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
              
              setListPasseios(docSnap);
      
            } else {
              console.log('Sem viagens cadastradas');
              setListPasseios([]);
            }
          } catch (error) {
            console.log('Ocorreu um erro: ', error);
        }
    };
    

    return(
        <View>
            <Header title={'Passeios'}  />
            <ImageLista />

            <ScrollView>
                {ListPasseios.length > 0 ? (
                    ListPasseios.map((passeio, index) => (
                        <View key={index} style={styles.boxLista}>
                        <ListaAdicionada
                            NomeLocal={passeio.Local}
                            Data={passeio.Data}
                            Horario={passeio.Horario}
                        />
                        </View>
                    ))
                ) : (
                    <View style={styles.boxLista}>
                        <Text>Nenhum passeio cadastrado</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default MeusPasseios;

const styles = StyleSheet.create({
    boxLista: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})