import React, { useState, useRef } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

function DropdownHour({ nome, valor, selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const options = ['Manhã', 'Tarde', 'Noite'];
  const dropdownRef = useRef(null);

  const handlePress = () => {
    setIsActive(!isActive);

    if (dropdownRef.current) {
      dropdownRef.current.measureInWindow((x, y, width, height) => {
        if (y + height > window.innerHeight) {
          setIsActive(false);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{nome}</Text>

      <TouchableOpacity
        ref={dropdownRef}
        style={styles.dropdownContainer}
        onPress={handlePress}
      >
        <View style={styles.input}>
          <Text style={styles.inputText}>
            {selected ? selected : valor}
          </Text>
          <Image source={require('../assets/dropdown.png')} style={styles.iconRight} />
        </View>

        {isActive && (
          <View style={styles.dropdownContent}>
            <ScrollView style={styles.dropdownScroll}>
              {options.map(option => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelected(option);
                    setIsActive(false);
                  }}
                >
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default DropdownHour;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#063A7A',
    marginBottom: 5,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1,
  },
  input: {
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    color: '#063A7A',
  },
  dropdownContent: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#063A7A',
    width: '100%',
    zIndex: 2,
  },
  dropdownScroll: {
    maxHeight: 150,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  iconRight: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
