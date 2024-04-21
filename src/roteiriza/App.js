import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
import Cadastro from './pages/Cadastro';
import Perfil from './pages/perfil';
 
const Stack = createStackNavigator()
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
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