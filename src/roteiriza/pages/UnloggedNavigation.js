import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';


import Home from './HomeViagem';
import NovaViagem from './Viagem02';
import Login from './pagina2/Usuario';

const Tab = createBottomTabNavigator();

const UnloggedNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = 'home';
            iconSize = 24;
          } else if (route.name === 'viagem') {
            iconName = 'plus-circle';
            iconSize = 45;
          } else if (route.name === 'usuario') {
            iconName = 'user';
            iconSize = 24;
          }

          return (
            <Icon
              name={iconName}
              size={iconSize}
              color={focused ? '#F5BD60' : color}
              />
          );
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
        component={NovaViagem}
        options={{
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="usuario"
        component={Login}
        options={{
          tabBarLabel: '',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default UnloggedNavigation;