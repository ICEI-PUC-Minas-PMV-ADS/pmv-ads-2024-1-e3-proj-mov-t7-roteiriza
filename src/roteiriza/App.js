import { Text, SafeAreaView, StyleSheet } from 'react-native';

// or any files within the Snack
import Cadastro  from './pages/Cadastro';
import Login from './pages/Login';
import Database from '../roteiriza/service/UsuarioService';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <Login />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    paddingTop: 70,
  },
});
