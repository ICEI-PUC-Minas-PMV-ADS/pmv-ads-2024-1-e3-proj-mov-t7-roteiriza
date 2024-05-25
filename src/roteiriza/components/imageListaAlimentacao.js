import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

const ImageLista = () => {
    return(
        <View style={styles.container}>
            <Image source={require('../assets/img/imgalimentacao1.png')} style={styles.img}/>
        </View>
               
    )
}

export default ImageLista;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 25
    },
    img: {
        marginBottom: 0
    }
})