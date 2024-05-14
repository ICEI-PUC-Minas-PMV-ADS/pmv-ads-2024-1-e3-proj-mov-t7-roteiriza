import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';

const Typography = ({ children, style }) => {
    // Ínicio do código para carregar a fonte Inter de forma assíncrona.
    let [fontsLoaded] = useFonts({
      'Inter': require('../assets/Inter_font/Inter-Regular.ttf'), // Adjust the path as needed
    });
  
    if (!fontsLoaded) {
      return null; // Final do código para carregar a fonte Inter de forma assíncrona.
    }

  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter',
  },
});

export const TypographyStyles = {
  headerTitle: {
    ...styles.text,
    color: '#063A7A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeaderTitle: {
    ...styles.text,
    color: '#75B1FA',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bodyText: {
    ...styles.text,
    color: '#181818',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20,
    marginTop: 5,
  },
  bodyTextHighlighted: {
    ...styles.text,
    color: '#75B1FA',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputTextHighlighted: {
    ...styles.text,
    color: '#063A7A',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default Typography;
