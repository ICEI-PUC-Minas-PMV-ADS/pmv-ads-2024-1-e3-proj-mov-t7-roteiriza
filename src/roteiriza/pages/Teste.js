import React from 'react'

import { firebase } from 'firebase/firestore'
import { View } from 'react-native-web';

const Teste = () =>{

    const passRef = firebase.firestore().collection('passagem')
    
    const savePassagem = () => {

        if(dataSaida && dataRetorno && qntdPessoas && transporte && valor && qntdMalas){
    
          let dadosPassagem = {
            Dt_saida: dataSaida,
            Dt_retorno: dataRetorno,
            Qntd_Pessoas: qntdPessoas,
            Transporte: transporte,
            Qntd_malas: qntdMalas,
            Valor: valor
          }
    
          passRef
            .add(dadosPassagem)
            .then((ref) =>{
              
              setDataSaida('');
              setDataRetorno('');
              setQntdPessoas('');
              setTransporte('');
              setQntdMalas('');
              setValor('');
    
    
              alert('Cadastro de passagem realizado com sucesso!');
    
            })
             .catch((error) => {
                alert(error.message);
              });
        }
        else{
          alert('Preencha os campos corretamente!')
    
        }
      };

    return (
        
        <View>
            <TouchableOpacity onPress={savePassagem} ><text>botao</text></TouchableOpacity>
        </View>
    );


}

export default Teste;
