import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity,StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Viagem01 = () => {

  const navigation = useNavigation();

  const handleRederect = () => {
    navigation.navigate('Adicionar Viagem')
  }

  return (
    <View style={styles.container}>
      <View style={[styles.mapContainer, { flex: 0.8 }]}>
        <ImageBackground
          source={require('../assets/mapanovaviagem.jpg')}
          style={[styles.image, { marginTop: 50, marginBottom: 50 }]}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>
      
      <View style={[styles.box, { flex: 0.4, marginTop: -20 }]}>
        <Text style={styles.title}>
          Roteirize{"\n"}sua viagem
        </Text>
        <Text style={styles.subtitle}>
          Adicione informações sobre o seu roteiro, hospedagem, alimentação, organização da mala e muito mais.
        </Text>

        <TouchableOpacity style={styles.addButton} onPress={handleRederect}>    
          <View style={styles.iconCircle}>
            <Image source={require('../assets/icons/plus_icon.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:20,
    flexDirection: 'column',
    padding: 10,
  },
  mapContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  box: {
    backgroundColor: '#063A7A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#ffffff',
    marginTop: 10,
  },
  addButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  iconCircle: {
    backgroundColor: '#0080ff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Viagem01;