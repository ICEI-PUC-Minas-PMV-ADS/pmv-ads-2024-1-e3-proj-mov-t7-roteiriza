import { Linking } from 'react-native';
import qs from 'qs'; 

export async function enviarEmail(emailDestino, titulo, mensagem) {

    let url = `mailto:${emailDestino}`;

    // Criando o email
    const query = qs.stringify({
        subject: titulo,
        body: mensagem   
    });

    if (query.length) {
        url += `?${query}`;
    }

    
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
}



export async function enviarNovoEmail(emailDestino, codigo) {

  const API_URL = 'https://localhost:7282/send-email';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailDestino, codigo }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar código');
      }

      const data = await response.json();

      console.log('Resposta da API:', data);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };


