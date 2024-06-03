import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Typography, { TypographyStyles } from './Typography.js';

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
        checked ? activeButtonStyle : inactiveButtonStyle,
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
  const [editingItemId, setEditingItemId] = useState(null);
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
    } else {
      console.log('Digite algo para adicionar!');
    }
  };

  const handleDeleteItem = (id) => {
    const updatedCheckboxes = checkboxes.filter((checkbox) => checkbox.id !== id);
    setCheckboxes(updatedCheckboxes);
  };

  const handleEditItem = (id) => {
    const itemToEdit = checkboxes.find((checkbox) => checkbox.id === id);
    if (itemToEdit) {
      setInputValue(itemToEdit.text);
      setEditingItemId(id);
    }
  };

  const handleSaveEdit = () => {
    if (inputValue.trim() !== '') {
      const updatedCheckboxes = checkboxes.map((checkbox) => {
        if (checkbox.id === editingItemId) {
          return {
            ...checkbox,
            text: inputValue,
          };
        }
        return checkbox;
      });
      setCheckboxes(updatedCheckboxes);
      setInputValue('');
      setEditingItemId(null);
    }
  };

  return (
    <ScrollView>
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
              <View style={styles.textAndIconsContainer}>
                <Typography style={TypographyStyles.bodyText}>
                  <Text style={[styles.checkboxLabel, TypographyStyles.checkboxLabel, checkbox.checked && styles.checkedText]}>
                    {editingItemId === checkbox.id ? (
                      <TextInput
                        style={styles.input}
                        value={inputValue}
                        onChangeText={setInputValue}
                        onBlur={handleSaveEdit}
                        autoFocus
                      />
                    ) : (
                      <Text>{checkbox.text}</Text>
                    )}
                  </Text>
                </Typography>
                <View style={styles.iconsContainer}>
                  {editingItemId === checkbox.id ? (
                    <Pressable onPress={handleSaveEdit} style={styles.iconButton}>
                      <Ionicons name="checkmark" size={24} color="#F5BD60" />
                    </Pressable>
                  ) : (
                    <>
                      <Pressable onPress={() => handleEditItem(checkbox.id)} style={styles.iconButton}>
                        <Image style={styles.icons} source={require('./assets/edit.png')} />
                      </Pressable>
                      <Pressable onPress={() => handleDeleteItem(checkbox.id)} style={styles.iconButton}>
                        <Image style={styles.icons} source={require('./assets/delete.png')} />
                      </Pressable>
                    </>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Adicionar um novo item..."
          />
          <Pressable style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,    
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    color: 'gray',
  },
  addButton: {
    backgroundColor: '#F5BD60',
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
    width: '100%',
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
  textAndIconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10, 
  },
  checkboxLabel: {
    fontSize: 14,
  },
  checkedText: {
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  icons: {
    width: 24,
    height: 24,
  },
});
