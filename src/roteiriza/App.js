import React from 'react';
import {View, Text} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './pages/Navigation';
import Passeios from './pages/Passeios';
import MeusPasseios from './pages/MeusPasseios'
import Passagem from './pages/Passagem'


const App = () => {
  return (
    <SafeAreaProvider>
        <Passagem />
    </SafeAreaProvider>

      
  )
};

export default App;
