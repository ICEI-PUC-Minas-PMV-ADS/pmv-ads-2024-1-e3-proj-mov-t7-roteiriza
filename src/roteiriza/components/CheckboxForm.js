import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Typography, { TypographyStyles } from './Typography.js';

import { collection, addDoc, query, where, getDocs, updateDoc, doc } from '@firebase/firestore';
import { firestore } from '../firebase/config';



function MyCheckbox({
  checked,
  onPress,
  buttonStyle = {},
  activeButtonStyle = {},
  inactiveButtonStyle = {},
  activeIconProps = {},
  inactiveIconProps = {},
}) 

{
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

export default function CheckboxForm({ viagemId }) {
  

  const [documentId, setDocumentId] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [editingItemId, setEditingItemId] = useState(null);
  const [checkboxes, setCheckboxes] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
   
    loadList();
    
  }, [ viagemId ]);

  const loadList = async () => {
    try {
      const bagagemCollectionRef = collection(firestore, 'bagagens');
      const q = query(bagagemCollectionRef, where('viagemId', '==', viagemId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        const doc = docSnapshot.data();

        const lisAux = [];

        for (let i = 0; i < doc.Itens.length; i++) {
          const itenListFirestore = {
            id: i,
            text: doc.Itens[i],
            checked: false,
          };

          lisAux.push(itenListFirestore);
        }

        setCheckboxes(lisAux);
        setDocumentId(docSnapshot.id);
      } else {
        console.log('Não existem itens!');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao acessar o Firestore:', error);
    }
  };

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

  const handleAddItem = async () => {
    try{
      if (inputValue.trim() !== '') {
        const newItem = {
          id: checkboxes.length + 1,
          text: inputValue,
          checked: false,
        };
        const listAdd = [...checkboxes, newItem];

        setCheckboxes(listAdd);
        setInputValue('');

        //Firebase
        const lisAux = [];
        for (let i = 0; i < listAdd.length; i++) {
          lisAux.push(listAdd[i].text);
        }
        const bagRef = doc(firestore, 'bagagens', documentId);
        await updateDoc(bagRef, { Itens: lisAux });
        alert('Cadastro de bagagem realizado com sucesso!');
      } else {
        console.log('Digite algo para adicionar!');
      }
    } catch(error){
      console.log('Ocorreu um erro ao salver no firebase: ', error)
    }

  };

  const handleDeleteItem = async (id) => {
    const updatedCheckboxes = checkboxes.filter((checkbox) => checkbox.id !== id);
    setCheckboxes(updatedCheckboxes);
    
    //Firebase
    try{  
      const lisAux = [];
      for (let i = 0; i < updatedCheckboxes.length; i++) {
        lisAux.push(updatedCheckboxes[i].text);
      }
      const bagRef = doc(firestore, 'bagagens', documentId);
      await updateDoc(bagRef, { Itens: lisAux });
    } catch(error){
      console.log('Ocorreu um erro ao salvar no firebase: ', error)
    }
  };

  const handleEditItem = (id) => {
    const itemToEdit = checkboxes.find((checkbox) => checkbox.id === id);
    if (itemToEdit) {
      setInputValue(itemToEdit.text);
      setEditingItemId(id);
      setStatus(true);
    }
  };

  const handleSaveEdit = async () => {
    try{
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
        setStatus(false);

        //Firebase
        const lisAux = [];
        for (let i = 0; i < updatedCheckboxes.length; i++) {
          lisAux.push(updatedCheckboxes[i].text);
        }
        const bagRef = doc(firestore, 'bagagens', documentId);
        await updateDoc(bagRef, { Itens: lisAux });
      }
    } catch(error){
      console.log('Ocorreu um erro ao salvar no firebase: ', error)
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
              <View style={styles.textAndIconsContainer}>
                <Typography style={TypographyStyles.bodyText}>

                  <Text style={[styles.checkboxLabel, TypographyStyles.checkboxLabel, checkbox.checked && styles.checkedText]}>
                      
                    {editingItemId === checkbox.id ? (
                      <TextInput
                        style={styles.input}
                        value={inputValue}
                        onChangeText={setInputValue}
                        onBlur={handleSaveEdit}                       
                      />
                    ) : (
                      <TextInput>{checkbox.text}</TextInput>
                    )}
                    
                  </Text>
                </Typography>

                <View style={styles.iconsContainer}>
                  {editingItemId === checkbox.id ? (
                    <Pressable onPress={handleSaveEdit} style={styles.iconButton}>
                        <Image style={styles.icons} source={require('../assets/edit.png')} />
                    </Pressable>
                  ) : (
                    <>
                      <Pressable onPress={() => handleEditItem(checkbox.id)} style={styles.iconButton}>
                        <Image style={styles.icons} source={require('../assets/edit.png')} />
                      </Pressable>
                      <Pressable onPress={() => handleDeleteItem(checkbox.id)} style={styles.iconButton}>
                        <Image style={styles.icons} source={require('../assets/delete.png')} />
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
          {status==false?(<Pressable style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>+</Text>
          
          </Pressable>):(<Pressable style={styles.addEdit} onPress={handleSaveEdit}>
            <Text style={styles.addButtonText}><svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 5L4.5 8L11.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></Text>
          
          </Pressable>)}

        </View>  
      </View>
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
  addEdit: {
    backgroundColor: '181818',
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