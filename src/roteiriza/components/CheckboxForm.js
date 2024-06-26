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

export default function CheckboxForm({ viagemId, userId }) {
  

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
            id: doc.Itens[i].id,
            text: doc.Itens[i].text,
            checked: doc.Itens[i].checked,
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

  const handleCheckboxPress = async (id) => {
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

    //Firebase
    try{
      if(documentId){
        const bagRef = doc(firestore, 'bagagens', documentId);
        await updateDoc(bagRef, { Itens: updatedCheckboxes });
        alert('Bagagem atualizada!');
      } 
    } catch (error){
      console.log('Ocorreu um erro ao salvar o check no firebase', error)
    }
  };

  const handleAddItem = async () => {
    console.log(documentId)
    try{
      if (inputValue.trim() !== '') {
        const newItem = {
          id: checkboxes.length + 1,
          text: inputValue,
          checked: false,
        };
        const listAdd = [...checkboxes, newItem];

        console.log(listAdd)

        setCheckboxes(listAdd);
        setInputValue('');

        //Firebase
        /*
          Se caso a variável de id do documento estiver setado,
          significa que iremos atualizar o documento. 
          Se não, vamos adicionar um novo documento.
        */

        //Atualizando o documento de acordo com o ID capturado na função loadList na linha 81.
        if(documentId){
          const bagRef = doc(firestore, 'bagagens', documentId);
          await updateDoc(bagRef, { Itens: listAdd });
          alert('Bagagem atualizada!');
        } 

        //Adicionando um novo documento.
        else {
          const bagagensRef = collection(firestore, 'bagagens');

          let docRefAdd = await addDoc(bagagensRef, {Itens: listAdd, userId: userId, viagemId: viagemId});
          setDocumentId(docRefAdd.id)

          alert('Cadastro de bagagem realizado com sucesso!');
        }
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
      const bagRef = doc(firestore, 'bagagens', documentId);
      await updateDoc(bagRef, { Itens: updatedCheckboxes });
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

        const bagRef = doc(firestore, 'bagagens', documentId);
        await updateDoc(bagRef, { Itens: updatedCheckboxes });
        alert('Bagagem atualizada!')
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
          {status == false ? (
            <Pressable style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.addEdit} onPress={handleSaveEdit}>
              <Text style={styles.addButtonText}>Atualizar</Text>
            </Pressable>
          )}
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
  addEdit: {
    backgroundColor: '181818',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
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