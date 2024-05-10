import React from 'react';
import {Text, View, Image, ScrollView, StyleSheet} from 'react-native';
import  Header  from '../components/Header'
import ContainerPasseios from '../components/containerPasseios'
import Button from '../components/buttonAdicionar';
import ListaAdicionada from '../components/listaAdicionada';
import ImageLista from '../components/imageLista';

const MeusPasseios = () => {
    return(
        <View>
            <Header title={'Passeios'}  />
            <ImageLista />

            <ScrollView>
                <View style={styles.boxLista}>
                    <ListaAdicionada
                        NomeLocal={'Praia de Copacabana'}
                        Data={'18 de Janeiro'}
                        Horario={'Manhã'}
                    />

                    <ListaAdicionada
                        NomeLocal={'Praia de Ipanema'}
                        Data={'18 de Janeiro'}
                        Horario={'Tarde'}
                    />
                </View>
                
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