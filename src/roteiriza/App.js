import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Viagem01 from '../roteiriza/pages/Viagem01';
import Viagem02 from '../roteiriza/pages/Viagem02';
import roteiro from  '../roteiriza/pages/roteiro';

const Stack = createStackNavigator()

export default function App(){
  return(
  <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name = 'Roteiro'
        component={roteiro}
      />
      <Stack.Screen
        name = 'Viagem01'
        component={Viagem01}
      />
      <Stack.Screen
        name = 'Viagem02'
        component={Viagem02}
      />
</Stack.Navigator>
    </NavigationContainer>
)}
