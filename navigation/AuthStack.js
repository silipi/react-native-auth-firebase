import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginScreen} options={{title: "Entrar"}} />
      <Stack.Screen name='Signup' component={SignupScreen} options={{title: "Cadastro"}} />
    </Stack.Navigator>
  );
}