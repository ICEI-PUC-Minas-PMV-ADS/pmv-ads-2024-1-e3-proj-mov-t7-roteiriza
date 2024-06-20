import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const ImageBagagem = () => {
    return(
        <View style={styles.container}>
            <Image source={require('../assets/img/Bagagem.png')} style={styles.img}/>
        </View>
               
    )
}

export default ImageBagagem;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 25,
        maxHeight: 200,
        
    },
    img: {
        marginBottom: 0,
        maxWidth: "100%",
        maxHeight: 200,
    }
})