import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
import Cadastro from './pages/cadastro';
import Perfil from './pages/perfil';
import Login from './pages/login';
import recSenha from './pages/recSenha'
 
const Stack = createStackNavigator()
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
          name='recSenha'
          component={recSenha}
        />
      <Stack.Screen
          name='Login'
          component={Login}
        />
      
      
        <Stack.Screen
          name='Cadastro'
          component={Cadastro}
        />
        <Stack.Screen
          name='Perfil'
          component={Perfil}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}