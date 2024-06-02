import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import typographyStyles from './Typography'; // Importe os estilos de tipografia

function MyCheckbox({
  checked,
  onPress,
  buttonStyle = {},
  activeButtonStyle = {},
  inactiveButtonStyle = {},
  activeIconProps = {},
  inactiveIconProps = {},
}) {
  const iconProps = checked ? activeIconProps : inactiveIconProps;
  return (
    <Pressable
      style={[
        buttonStyle,
        checked
          ? activeButtonStyle
          : inactiveButtonStyle,
      ]}
      onPress={onPress}>
      {checked && (
        <Ionicons
          name="checkmark"
          size={24}
          color="white"
          {...iconProps}
        />
      )}
    </Pressable>
  );
}

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, text: 'Camiseta', checked: false },
    { id: 2, text: 'Calça', checked: false },
    { id: 3, text: 'Tênis', checked: false },
    { id: 4, text: 'Chinelo', checked: false },
    { id: 5, text: 'Escova de dentes', checked: false },
    { id: 6, text: 'Pasta de dente', checked: false },
    { id: 7, text: 'Notebook', checked: false },
    { id: 8, text: 'Mochila', checked: false },
  ]);

  const handleCheckboxPress = (id) => {
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.id === id) {
        return {
          ...checkbox,
          checked: !checkbox.checked,
        };
      }
      return checkbox;
    });
    setCheckboxes(updatedCheckboxes);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      const newItem = {
        id: checkboxes.length + 1,
        text: inputValue,
        checked: false,
      };
      setCheckboxes([...checkboxes, newItem]);
      setInputValue('');
    }
  };

  return (
    <View style={styles.appContainer}>
      
      <View style={styles.checkboxContainer}>
        {checkboxes.map((checkbox) => (
          <View key={checkbox.id} style={styles.checkboxItem}>
            <MyCheckbox
              checked={checkbox.checked}
              onPress={() => handleCheckboxPress(checkbox.id)}
              buttonStyle={styles.checkboxBase}
              activeButtonStyle={styles.checkboxChecked}
            />
            {/* Aplicando os estilos de tipografia ao rótulo do checkbox */}
            <Text style={[styles.checkboxLabel, typographyStyles.checkboxLabel]}>{checkbox.text}</Text>
          </View>
        ))}
      </View>
            <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Remédios"
        />
        <Pressable style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#063A7A',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',

  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#063A7A',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 16,
  },
});