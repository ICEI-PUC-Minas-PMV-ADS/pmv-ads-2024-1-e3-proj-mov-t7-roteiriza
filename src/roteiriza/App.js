import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';




import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail  } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs} from '@firebase/firestore';

import { app, firestore } from './firebase/config';
import Autenticador from './pages/Autenticador';
import AuthenticatedScreen from './pages/authenticatedScreen';
import Perfil from './pages/perfil';
import Forgot_password from './pages/Esq_Senha';
import Passagem from './pages/Passagem'
import Teste from './pages/Teste';
import Hospedagem from './pages/Hospedagem';
import Navigation  from './pages/Navigation';

import Container from './components/Container';



const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);
  const [userId, setUserId] = useState(null); // Track user document ID

  const Stack = createStackNavigator()

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  
  const handleAuthentication = async () => {
    try {

      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          const login = await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
          
          if(login){
            let querySnapshot = await getDocs(query(collection(firestore, 'users'), where('Email', '==', email)));

            const docSnap = querySnapshot.docs[0];
            setUserId(docSnap.id);
            
          }
          else{
            console.log('Ocorreu um erro ao pegar o id do documento no login!')
          } 
          
        } else {
          // Sign up
          let userRef = collection(firestore, 'users');

          await createUserWithEmailAndPassword(auth, email, password);

          const item = { 
            Name: name,
            Email: email,
            Senha: password
          };

          // Adicione um novo usuário e obtenha a referência do documento adicionado
          const docRef = await addDoc(userRef, item);

          // Extraia o ID do documento adicionado
          const docId = docRef.id;
          setUserId(docId);

          console.log('User created successfully!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {user ? (
          <Navigation user={user} handleAuthentication={handleAuthentication}/>
        ) : (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
              <Stack.Screen name="Autenticador">
                {props => (
                  <Autenticador
                    {...props}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    handleAuthentication={handleAuthentication}
                  />
                )}
              </Stack.Screen>
        

              <Stack.Screen name="recSenha">
                {props =>(
                    <Forgot_password
                      {...props}         
                      user={null}
                    />
                )}
                  
              </Stack.Screen>             
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
 
  
}



export default App;
