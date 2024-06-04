import React from 'react';
import { useState, useEffect  } from 'react';
import {Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Modal} from 'react-native';




const ListaAdicionada = ({NomeLocal, Data, Horario, onPress })=> {
    const [modalVisible, setModalVisible] = useState(false);

    const editar = ('click', () => {
        setModalVisible(true);
    });

    

    return(
        <View style={styles.boxLista}> 
            <View style={styles.container}>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.titulo}>{NomeLocal}</Text>
                </TouchableOpacity>
                <View style={styles.acaoBox}>
                    
                    
                </View>
            </View>
            
            <Text style={styles.informacoes}>{`${Data} | ${Horario}`}</Text>
            
        </View>

    )
}

export default ListaAdicionada;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 17.5,
        color: '#75B1FA'
    },
    acaoBox: {
        flexDirection: 'row',
        gap: 10,  
        left: 222,
        top: 15,
        position: 'absolute'
    },
    icons:{
        width: 24,
        height: 24,
        
    },
    informacoes:{
        paddingTop: 6
    },
    boxLista: {
        width: 285,
        margin: 10
    },
    modalContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 280,
        height: 'auto',
        marginLeft: 55,
        marginTop: 300,
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3
    },
    modalTitulo: {
        fontWeight: 'bold',
        fontSize: 17,
        margin: 10,
        color: '#063A7A',
        marginTop: 20
    },
    modalButtonCancelar: {
        fontWeight: 'bold',
        fontSize: 14,
        backgroundColor: "white",
        width: 100,
        height: 25,
        borderWidth: 1,
        borderColor: '#181818',
        borderRadius: 3,
        textAlign: 'center',
        paddingTop: 2
    },
    modalButtonEditar:{
        fontWeight: 'bold',
        fontSize: 14,
        backgroundColor: '#F5BD60',
        width: 100,
        height: 25,
        borderRadius: 3,
        color: 'white',
        textAlign: 'center',
        paddingTop: 2
    },
    modalContent: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonBox: {
        flexDirection: 'row',
        gap: 10,
        margin: 20
    }

})