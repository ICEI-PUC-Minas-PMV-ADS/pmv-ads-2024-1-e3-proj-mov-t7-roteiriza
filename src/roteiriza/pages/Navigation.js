import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { StyleSheet, Image } from 'react-native';
import StackNavigation from './StackNavigation';

  const Imagem = ({ source }) => (
    <Image source={source} style={{ width: 24, height: 24}} />
  );

  const Navigation = ({ user, handleAuthentication, userId, objectUser }) => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'home', icon: () =>  <Imagem source={require('../assets/icons/home_white.png')} /> },
    { key: 'viagem', icon: () => <Imagem source={require('../assets/icons/plane_white.png')} /> },
    { key: 'usuario', icon: () => <Imagem source={require('../assets/icons/user_white.png')} /> },
  ]);

  const renderScene = BottomNavigation.SceneMap({

    home: () =>
      <StackNavigation 
        type='home'
        user={user}
        handleAuthentication={handleAuthentication}
        userId={userId}
        objectUser={objectUser}
      />,

    viagem: () =>
      <StackNavigation 
        type='viagem'
        user={user}
        handleAuthentication={handleAuthentication}
        objectUser={objectUser}
        userId={userId}
      />,

    usuario: () => 
      <StackNavigation 
        type='usuario'
        user={user}
        handleAuthentication={handleAuthentication}
        objectUser={objectUser}
      />,
  });

  return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={({ route }) => route.icon()}
        barStyle={styles.background}
        theme={{colors: {secondaryContainer: '#F5BD60'}}}
        shifting={false}
      />
  );
};

const styles = StyleSheet.create({
  background: {
    height: 60,
    backgroundColor: '#063A7A',
    paddingTop: 5,
    borderRadius: 15,
    shadowOffset: { width: 2, height: -10 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
});

export default Navigation;