import React from 'react';
import {Text, View, Image, ScrollView, StyleSheet} from 'react-native';
import  HeaderTop  from './styles/header'
import ContainerPasseios from './styles/containerPasseios'
import Button from './styles/buttonAdicionar';
import ContainerLista from './styles/imageLista';
import ListaAdicionada from './styles/listaAdicionada';
import ImageLista from './styles/imageLista';

const MeusPasseios = () => {
    return(
        <View>
            <HeaderTop headerTitle={'Passeios'}  />
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