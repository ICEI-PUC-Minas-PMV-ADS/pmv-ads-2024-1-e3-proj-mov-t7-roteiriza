import { Text, SafeAreaView, StyleSheet } from 'react-native';
import Cadastro  from './components/Cadastro';
import Atualizar_viagem  from './components/Atualizar_viagem';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
       {/* <Cadastro/> */}
       <Atualizar_viagem/>
     
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
