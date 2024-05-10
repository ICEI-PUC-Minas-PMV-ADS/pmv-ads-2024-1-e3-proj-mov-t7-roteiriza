import React, { useState } from 'react';
import { BottomNavigation} from 'react-native-paper';
import { StyleSheet } from 'react-native';

import Home from './Home';
import Viagem from './Viagem';
import Bagagem from './Bagagem';
import Roteiro from './Roteiro';
import Usuario from './Usuario';
import Passeios from './Passeios';
import MeusPasseios from './MeusPasseios';
import Passagem from './Passagem'

const Navigation = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', icon: 'home'},
    { key: 'viagem', icon: 'dots-grid'},
    { key: 'bagagem', icon: 'bag-suitcase-outline'},
    { key: 'roteiro', icon: 'map-outline'},
    { key: 'usuario', icon: 'account'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    viagem: Viagem,
    bagagem: Bagagem,
    roteiro: Roteiro,
    usuario: Usuario,
    passeios: Passeios,
    meusPasseios: MeusPasseios,
    passagem: Passagem,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={styles.background}
    />
  );
};


const styles = StyleSheet.create({
  background: {
    height: 60,
    backgroundColor: '#063A7A',
    paddingTop: 10,
    borderRadius: 15,
    shadowOffset: { width: 2, height: -10 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
});

export default Navigation;