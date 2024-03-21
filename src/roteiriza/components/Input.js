import React from 'react'
import { StyleSheet } from 'react-native';
import { Appbar, TextInput} from 'react-native-paper';

const Input = (props) => {
  return (
     <TextInput
          style={styles.input}
          keyboardType= 'text'
          {...props}
        />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFF',
    marginBottom: 8,
    borderRadius: 8
  },
});

export default Input