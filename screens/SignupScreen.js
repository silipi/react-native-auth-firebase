import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, TextInput, ToastAndroid, TouchableOpacity, View, Platform, Image } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import PasswordInput from '../components/PasswordInput';
import * as ImagePicker from 'expo-image-picker';

import { AuthContext } from '../navigation/AuthProvider';

export default function SignupScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signup } = React.useContext(AuthContext);

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSignup = () => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regexEmail.test(email)) {
      ToastAndroid.show("Insira um e-mail com formato válido.", ToastAndroid.SHORT)
      return;
    }

    if (password.length < 6) {
      ToastAndroid.show("A senha informada deve conter no mínimo 6 caracteres.", ToastAndroid.SHORT)
      return;
    }
    
    if (name.length < 2) {
      ToastAndroid.show("Informe seu nome completo.", ToastAndroid.SHORT)
      return;
    }

    signup(email, password, name, image);
  }

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={{ width: 140, height: 140, borderRadius: 70, marginBottom: 10 }} />}
      <Button title="Escolha uma imagem para o perfil..." onPress={pickImage} />
      <CustomTextInput 
        onChangeText={value => setName(value)}
        placeholder="Nome completo"
        autoCapitalize="words"
        width="90%"
        icon="person"
      />
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
        placeholder="Senha (minímo 6 caracteres)"
        width="90%"
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Cadastrar-se</Text>
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
  input: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  button: {
    marginTop: 30,
    marginBottom: 8,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#8395a7',
    borderRadius: 5,
    width: "80%"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: '#fff'
  },
});
