
import { StyleSheet, View, Alert, Image, Button, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { Appbar, Text, TextInput} from 'react-native-paper';


export default function AssetExample() {
  return (
    <View style={styles.container}>
        <View>
            <Text>Atualize sua viagem</Text>
            <Text>Atualize as informações sobre a sua viagem</Text>
        </View>
        <View>
            <Text>Destino da viagem</Text>
            <TextInput style={styles.input} placeholder='Rio de janeiro'/>
            <View>
                <Text>Quer mudar o destino ?</Text>
                <TouchableOpacity>
                    <Text>Edite agora</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View>
            <Text>Data de inicio da viagem</Text>
            <TextInput style={styles.input} placeholder='19 de janeiro'/>
            <View>
                <Text>Quer mudar a data de início ?</Text>
                <TouchableOpacity>
                    <Text>Edite agora</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View>
            <Text>Data final da viagem</Text>
            <TextInput style={styles.input} placeholder='22 de janeiro'/>
            <View>
                <Text>Quer mudar a data final ?</Text>
                <TouchableOpacity>
                    <Text>Edite agora</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.containerDoubleCard} >
            <Button style={styles.buttoDXn} title="SALVAR"/>
            <Button style={styles.buttoDXn} title="CANCELAR"/>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#75B1FA',
    borderRadius: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
  },
  containerDoubleCard: {
    flexDirection: 'row',
    backgroundColor: 'red',
    height: 50,
    justifyContent: 'space-evenly',
  },
  buttoDXn: {
    height: 10,
    width: 10,

  }

});
