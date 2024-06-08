import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail  } from 'firebase/auth';
import { collection, addDoc, doc, query, where, getDocs, updateDoc} from '@firebase/firestore';

import { app, firestore } from './firebase/config';
import Autenticador from './pages/Autenticador';
import AuthenticatedScreen from './pages/authenticatedScreen';
import Perfil from './pages/perfil';
import Forgot_password from './pages/Esq_Senha';
import Passagem from './pages/Passagem'
import Teste from './pages/Teste';
import Hospedagem from './pages/Hospedagem';
import Navigation  from './pages/Navigation';
import Usuario from './pages/pagina2/Usuario';
import Home from './pages/HomeViagem';
import Container from './components/Container';

const App = () => {
  LogBox.ignoreAllLogs(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);
  const [userId, setUserId] = useState(''); // Track user document ID
  const [objectUser, setObjectUser] = useState('');

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
        console.log('User logged out successfully!');

        alert('Você foi desconectado!')
        await signOut(auth);
        
      } else {
        if (isLogin) {
          try{
            const login = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully!');
            
            if(login.user){
              let querySnapshot = await getDocs(query(collection(firestore, 'users'), where('Email', '==', email)));

              if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];   
                const userData = { id: docSnap.id, ...docSnap.data() };

                if (userData.Senha != password) {
                  await updateDoc(doc(firestore, 'users', docSnap.id), {
                    Senha: password
                  });

                  userData.Senha = password;
                }
                setObjectUser(userData);
                setUserId(docSnap.id);
              }
            }
            else{
              alert('Email ou senha inválidos!')
              console.log('Ocorreu um erro ao pegar o id do documento no login!')
            } 
          }
          catch(error){
            alert('Email ou senha inválidos!')
            console.log('Ocorreu um erro', error)
          }
        } else {
       
          try{
            let userRef = collection(firestore, 'users');

            await createUserWithEmailAndPassword(auth, email, password);

            const item = { 
              Name: name,
              Email: email,
              Senha: password
            };

            const docRef = await addDoc(userRef, item);

            const docId = docRef.id;
            setUserId(docId);

            const userData = {id: docId, Name: name, Email: email, Senha: password }
            setObjectUser(userData);

            console.log('User created successfully!');
          }
          catch(error){
            alert('Preencha os campos corretamente!')
          }
        }
      }
    } catch (error) {
      alert('Usuário ou senha inválidos!')
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {user ? (
          <Navigation userId = {userId} user={user} handleAuthentication={handleAuthentication} objectUser = {objectUser}/>
        ) : (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
              <Stack.Screen name=" ">
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
