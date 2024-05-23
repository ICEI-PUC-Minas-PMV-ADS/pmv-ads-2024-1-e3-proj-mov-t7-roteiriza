import React, {useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ImageBackground, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Viagem01 = ({ user, handleAuthentication, userId }) => {

  const navigation = useNavigation();

  // Obtendo as dimensões da janela
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // Proporções definidas para atender às dimensões especificadas
  const mapContainerHeight = 660 / 1000 * windowHeight;

  const gap = 30; // Espaço entre os contêineres

  const handleRederect = () => {
    navigation.navigate('Adicionar Viagem')
  }

  return (
    <View style={styles.container}>
      {/* Map Container */}
      <View style={[styles.mapContainer, { flex: 0.8 }]}>
        <ImageBackground
          source={require('../assets/mapanovaviagem.jpg')}
          style={[styles.image, { marginTop: 50, marginBottom: 50 }]} // Adicionando margem superior e inferior
          resizeMode="cover"
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>
      
      {/* Box Container */}
      <View style={[styles.box, { flex: 0.4, marginTop: -20 }]}>
        <Text style={styles.title}>Roteirize{"\n"}sua viagem</Text>
        <Text style={styles.subtitle}>Adicione informações sobre o seu roteiro, hospedagem, alimentação, organização da mala e muito mais.</Text>
        {/* Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleRederect}>    
          <View style={styles.iconCircle}>
            <Ionicons name="add" size={24} color="#ffffff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:20,
    flexDirection: 'column', // Alterando a direção do flexbox para vertical
    padding: 10, // Adicionando um padding para criar uma margem
  },
  mapContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%', // Utilizando toda a largura disponível
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
    marginBottom: 10, // Espaço entre a caixa e a parte inferior da tela
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
    marginTop: 10, // Adicionando margem superior
  },
  addButton: {
    alignItems: 'center', // Centralizando conteúdo horizontalmente
    marginTop: 10,
  },
  iconCircle: {
    backgroundColor: '#0080ff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center', // Centralizando conteúdo horizontalmente e verticalmente
  },
});

export default Viagem01;