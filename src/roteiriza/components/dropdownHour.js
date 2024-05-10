import React from 'react';
import {Text, View, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import Input from './Input';

function DropdownHour ({nome, valor, selected, setSelected}){
  const [isActive, setIsActive] = useState(false)
  const options = ['Manhã', 'Tarde', 'Noite']
  
    return(
        <View>
            <Text style={styles.textInput}>{nome}</Text>

              <TouchableOpacity ClassName='dropdown' 
                style={styles.inputMenor}
                onPress= {e => setIsActive(!isActive)}
              >

              <TouchableOpacity ClassName='dropdown-btn'>
                <Text 
                  onPress= {e => setIsActive(!isActive)}
                  style={[styles.placeholder, selected !== valor && styles.selectedValue]}
                > 
                  {selected ? selected : valor}

                </Text>
              </TouchableOpacity>

              {isActive && (
                  <View ClassName='dropdown-content' style={styles.dropdownContent}>
                    {options.map(option => (
                      <TouchableOpacity 
                        key={option}
                        ClassName='dropdown-item'
                        style={styles.dropdownItem}
                          onPress={ e => {setSelected(option)
                          setIsActive(false)}
                          }
                        >
                        <Text>{option}</Text>
                      </TouchableOpacity>
                    ))}

                  </View>
              )}
              
            </TouchableOpacity>
            
             <TouchableOpacity
              onPress= {e => setIsActive(!isActive)}
             >
              <Image source={require('../assets/img/dropdown.png')} style={styles.iconRight} />
             </TouchableOpacity>
            
        </View>
    )
}


export default DropdownHour;

const styles = StyleSheet.create({
    inputMenor: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 7,
        paddingStart: 34,
        borderWidth: 1,
        borderColor: '#CACACA',
        width: 130,
        height: 35, 
        fontSize: 14,
        position: 'relative',
        userSelect: 'none'
         
    },
          
    textInput: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#063A7A',
        paddingBottom: 2
    },
    iconRight: {
        width: 21,
        height: 21,
        bottom: 30,
        left: 9
    },
    dropdownContent :{
        position: 'absolute',
        top: 40,
        paddingTop: 2,
        paddingStart: 30,
        paddingBottom: 2,
        backgroundColor: '#ffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        borderColor: '#CACACA',
        width: 130,
        height: 'auto', 
        fontSize: 14,
        zIndex: 1
    },
    dropdownItem: {
        paddingBottom: 10,
        paddingTop: 5,

    },
    placeholder: {
        color: '#CACACA', 
    },
    selectedValue: {
      color: '#181818'
    }
})