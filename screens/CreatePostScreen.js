import React, { useState, useContext } from 'react';

import { StyleSheet, View, Text, Button, TextInput, ToastAndroid } from 'react-native';
import firebase from '../database/firebase';
import { AuthContext } from '../navigation/AuthProvider';

export default function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = useState('');
  const { user } = useContext(AuthContext)

  const handleSave = () => {
    // Validações prévias (early returns):
    if (postText.trim() === '') {
      return;
    } 

    if (postText.length < 2 || postText.length >= 250) {
      ToastAndroid.showWithGravity(
        `O post precisa conter entre 2 até 250 caracteres. Total digitado: ${postText.length}.`, 
        ToastAndroid.SHORT, 
        ToastAndroid.BOTTOM
      );
      return;
    }

    addNewPostToDatabase();

    navigation.navigate('Home')
  }

  const addNewPostToDatabase = async () => {
    try {
      await firebase.firestore().collection("posts").add({
        postedAt: firebase.firestore.FieldValue.serverTimestamp(),
        post: postText,
        userId: user.uid   
      })
    } catch (e) {
      ToastAndroid.showWithGravity(e, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }
  }

  return (
    <>
      <TextInput
        multiline
        placeholder="O que você está pensando?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Salvar"
        onPress={handleSave}
      />
    </>
  );
}
