import React, { useState } from 'react';
import { BottomNavigation} from 'react-native-paper';
import { StyleSheet } from 'react-native';

import Home from './pagina2/Home';
import Viagem from './pagina2/Viagem';
import Bagagem from './pagina2/Bagagem';
import Roteiro from './Esq_Senha';
import Usuario from './pagina2/Usuario';

const Navigation = ({ user, handleAuthentication}) => {

  console.log(user)
  console.log(user.email)
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', icon: 'home'},
    { key: 'viagem', icon: 'dots-grid'},
    { key: 'bagagem', icon: 'bag-suitcase-outline'},
    { key: 'roteiro', icon: 'map-outline'},
    { key: 'usuario', icon: 'account'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <Home user={user} />,
    viagem: () => <Viagem user={user} />,
    bagagem: () => <Bagagem user={user} />,
    roteiro: () => <Roteiro user={user} />,
    usuario: () => <Usuario user={user} />,
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