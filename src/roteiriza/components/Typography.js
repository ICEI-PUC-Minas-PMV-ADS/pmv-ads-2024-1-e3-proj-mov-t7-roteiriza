import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Typography = ({ children, style }) => {
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
  bodyText: {
    ...styles.text,
    color: '#063A7A',
    fontSize: 14,
    fontWeight: 500,
    height: 20,
  },
  bodyTextHighlighted: {
    ...styles.text,
    color: '#75B1FA',
    fontSize: 14,
    fontWeight: 'bold',
  },
};

export default Typography;
