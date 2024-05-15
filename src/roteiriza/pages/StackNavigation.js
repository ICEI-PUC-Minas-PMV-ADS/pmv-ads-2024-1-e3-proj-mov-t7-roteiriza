
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import Viagem01 from './Viagem01';
import Viagem02 from './Viagem02';

const Stack = createStackNavigator();

const StackNavigation = ({ user, handleAuthentication, userId }) => {
    
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
};

export default StackNavigation;
