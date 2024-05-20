
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import Viagem01 from './Viagem01';
import Viagem02 from './Viagem02';
import Home from './HomeViagem';
import Atualizar_viagem from './Atualizar_viagem'

const Stack = createStackNavigator();

const StackNavigation = ({ user, handleAuthentication, userId, objectUser, type }) => {
  
  if (type === 'home'){
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Viagem01">
                {(props) => <Viagem01 {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} />} 
            </Stack.Screen>

            <Stack.Screen name="Viagem02">
                {(props) => <Viagem02 {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} />} 
            </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  else if (type === 'viagem'){
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Home">
                {(props) => <Home {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser}/>} 
            </Stack.Screen>

            <Stack.Screen name="Atualizar_viagem">
                {(props) => <Atualizar_viagem {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
            </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default StackNavigation;
