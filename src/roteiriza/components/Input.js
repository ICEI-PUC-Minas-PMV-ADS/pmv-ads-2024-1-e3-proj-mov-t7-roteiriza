import React from 'react'
import { StyleSheet, View } from 'react-native';
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
    backgroundColor: '#fff',
    marginBottom: -6,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 1,
    borderColor: '#063A7A',

    
  },
});

export default Input