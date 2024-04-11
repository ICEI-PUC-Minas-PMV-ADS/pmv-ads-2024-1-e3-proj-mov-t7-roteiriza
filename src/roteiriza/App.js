import { Text, SafeAreaView, StyleSheet } from 'react-native';

// or any files within the Snack
import Cadastro  from './components/Cadastro';
import Passeios from './components/Passeios';


export default function App() {
  return (
    <SafeAreaView>
      {/*<Cadastro />*/}
      <Passeios />
    </SafeAreaView>
  );
}

{/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    paddingTop: 70,
  },
});*/}
