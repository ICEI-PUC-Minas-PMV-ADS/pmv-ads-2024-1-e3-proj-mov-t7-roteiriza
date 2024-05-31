
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
import MinhaAlimentacao from './MinhaAlimentacao';
import Emergencia from './Emergencia';
import Passagem from './Passagem';
import Passeios from './Passeios';
import Usuario from './pagina2/Usuario';
import ForgotPasswordScreen from './Esq_Senha';

const Stack = createStackNavigator();

const StackNavigation = ({ user, handleAuthentication, userId, objectUser, type }) => {
  
  if (type === 'home'){
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Home" options={{headerTintColor: '#063A7A'}}>
                {(props) => <Viagem01 {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} />} 
            </Stack.Screen>

            <Stack.Screen name="Adicionar Viagem" options={{headerTintColor: '#063A7A'}}>
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
            <Stack.Screen name="Home" options={{headerTintColor: '#063A7A'}}>
                {(props) => <Home {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser}/>} 
            </Stack.Screen>

            <Stack.Screen name="Atualizar_viagem" options={{headerTintColor: '#063A7A'}}>
                {(props) => <Atualizar_viagem {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
            </Stack.Screen>

            <Stack.Screen name="SubMenu" options={{headerTintColor: '#063A7A'}}>
              {(props) => <SubMenu {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser}/>} 
            </Stack.Screen>

            <Stack.Screen name="Hospedagem" options={{headerTintColor: '#063A7A'}}>
              {(props) => <Hospedagem {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
            </Stack.Screen>

            <Stack.Screen name="Alimentação" options={{headerTintColor: '#063A7A'}}>
              {(props) => <MinhaAlimentacao {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
            </Stack.Screen>

            <Stack.Screen name="Meus Passeios" options={{headerTintColor: '#063A7A'}}>
              {(props) => <MeusPasseios {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
            </Stack.Screen>

            <Stack.Screen name="Criar Passeio" options={{headerTintColor: '#063A7A'}}>
              {(props) => <Passeios {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
            </Stack.Screen>

            <Stack.Screen name="Emergencia" options={{headerTintColor: '#063A7A'}}>
              {(props) => <Emergencia {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
            </Stack.Screen>

            <Stack.Screen name="Passagem" options={{headerTintColor: '#063A7A'}}>
              {(props) => <Passagem {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
            </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  else if (type === 'usuario'){
    return (
      <NavigationContainer>
      <Stack.Navigator headerMode="none" screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Perfil do usuario" options={{headerTintColor: '#063A7A'}}>
              {(props) => <Usuario {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser}/>} 
          </Stack.Screen>

          <Stack.Screen name="Esqueci minha senha">
              {(props) => <ForgotPasswordScreen {...props} user={user} handleAuthentication={handleAuthentication} userId={userId} objectUser={objectUser} />} 
          </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>

    )
  }
};

export default StackNavigation;
