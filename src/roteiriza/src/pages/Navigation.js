import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';


import Home from './Home';
import Viagem from './Viagem';
import Bagagem from './Bagagem';
import Roteiro from './Roteiro';
import Usuario from './Usuario';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = 'home';
            iconSize = 24;
          } else if (route.name === 'viagem') {
            iconName = 'compass';
            iconSize = 26;
          } else if (route.name === 'bagagem') {
            iconName = 'suitcase';
            iconSize = 24;
          } else if (route.name === 'roteiro') {
            iconName = 'map';
            iconSize = 20;
          } else if (route.name === 'usuario') {
            iconName = 'user';
            iconSize = 24;
          }

          return <Icon name={iconName} size={iconSize} color={focused ? '#F5BD60' : color} />;
        },
        tabBarActiveTintColor: '#F5BD60',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: {
          backgroundColor: '#063A7A', 
          borderTopColor: 'transparent',
          paddingTop: 12,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          height: 70,
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="viagem"
        component={Viagem}
        options={{
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="bagagem"
        component={Bagagem}
        options={{
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="roteiro"
        component={Roteiro}
        options={{
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="usuario"
        component={Usuario}
        options={{
          tabBarLabel: '',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
