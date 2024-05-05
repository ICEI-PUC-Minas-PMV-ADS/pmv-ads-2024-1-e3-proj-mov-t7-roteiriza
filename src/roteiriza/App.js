import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Viagem01 from '../pages/Viagem01';
import Viagem02 from '../pages/Viagem02';

const Stack = createStackNavigator()

export default function App(){
  return(
  <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>

      <Stack.Screen
        name = 'NovaViagem1'
        component={Viagem01}
      />
      <Stack.Screen
        name = 'NovaViagem2'
        component={Viagem02}
      />
</Stack.Navigator>
    </NavigationContainer>
)}
