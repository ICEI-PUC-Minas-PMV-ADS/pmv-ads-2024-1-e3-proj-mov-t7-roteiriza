import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import Viagem01 from './Viagem01';
import Viagem02 from './Viagem02';
import Viagem from './pagina2/Viagem';
import MeusPasseios from './MeusPasseios';
import Roteiro from './Esq_Senha';
import Usuario from './pagina2/Usuario';
import Hospedagem from './Hospedagem';
import Home from './HomeViagem';
import SubMenu from './SubMenu';
import Passagem from './Passagem';

import StackNavigation from './StackNavigation';

const Navigation = ({ user, handleAuthentication, userId, objectUser}) => {
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', icon: 'home'},
    { key: 'viagem', icon: 'dots-grid'},
    { key: 'bagagem', icon: 'bag-suitcase-outline'},
    { key: 'roteiro', icon: 'map-outline'},
    { key: 'usuario', icon: 'account'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home:   () => <StackNavigation type='home' user={user} handleAuthentication={handleAuthentication} userId = {userId} objectUser={objectUser} />,
    viagem: () => <StackNavigation type='viagem' user={user} handleAuthentication={handleAuthentication} objectUser={objectUser} userId = {userId} />,
    bagagem: () => <Passagem user={user} handleAuthentication={handleAuthentication} objectUser={objectUser} userId = {userId}/>,
    roteiro: () => <Roteiro user={user} handleAuthentication={handleAuthentication}/>,
    usuario: () => <Usuario user={user} handleAuthentication={handleAuthentication} objectUser = {objectUser}/>,
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