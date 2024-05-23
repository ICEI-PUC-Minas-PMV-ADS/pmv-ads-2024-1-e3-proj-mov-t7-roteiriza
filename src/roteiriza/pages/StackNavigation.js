
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import Viagem01 from './Viagem01';
import Viagem02 from './Viagem02';
import Home from './HomeViagem';
import Atualizar_viagem from './Atualizar_viagem'
import SubMenu from './SubMenu';
import Hospedagem from './Hospedagem';
import MeusPasseios from './MeusPasseios';
import Emergencia from './Emergencia';
import Passagem from './Passagem';

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

            <Stack.Screen name="SubMenu">
              {(props) => <SubMenu {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
            </Stack.Screen>

            <Stack.Screen name="Hospedagem">
              {(props) => <Hospedagem {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
            </Stack.Screen>

            <Stack.Screen name="Meus Passeios">
              {(props) => <MeusPasseios {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
            </Stack.Screen>

            <Stack.Screen name="Emergencia">
              {(props) => <Emergencia {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
            </Stack.Screen>

            <Stack.Screen name="Passagem">
              {(props) => <Passagem {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
            </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  else if (type === 'menu'){
    return (
      <NavigationContainer>
      <Stack.Navigator headerMode="none" screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Home">
              {(props) => <Home {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser}/>} 
          </Stack.Screen>

          <Stack.Screen name="SubMenu">
              {(props) => <SubMenu {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
          </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>

    )
  }
};

export default StackNavigation;
