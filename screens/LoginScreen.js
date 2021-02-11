import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import PasswordInput from '../components/PasswordInput';

import { AuthContext } from '../navigation/AuthProvider';

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <CustomTextInput 
        onChangeText={value => setEmail(value)}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        width="90%"
        icon="mail"
      />
      <PasswordInput 
        onChangeText={value => setPassword(value)} 
        width="90%"
      />

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => login(email, password)}
      >
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.signupButton} 
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.signupButtonText}>Não tem uma conta?</Text>
        <Text style={styles.signupButtonTextSecondary}>Cadastre-se!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginButton: {
    marginTop: 30,
    marginBottom: 8,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#8395a7',
    borderRadius: 5,
    width: "80%"
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: '#fff'
  },
  signupButton: {
    width: "80%",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  signupButtonText: {
    lineHeight: 16
  },
  signupButtonTextSecondary: {
    marginLeft: 5,
    fontWeight: "700",
    color: "#10ac84"
  }
});
