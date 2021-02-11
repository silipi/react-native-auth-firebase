import React, { createContext, useState } from 'react';
import firebase from '../database/firebase';

export const AuthContext = createContext({});

const uploadImageAsync = async (uri, userId) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  
  const ref = firebase.storage().ref('users/' + userId + '/').child("avatar")
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider 
      value={{
        user: user,
        setUser: setUser,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.log(error);
          }
        },
        signup: async (email, password, name, imageUri) => {
          try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then(
              async credentials => {
                const url = await uploadImageAsync(imageUri, credentials.user.uid);

                credentials.user.updateProfile({
                  displayName: name,
                  photoURL: url
                });

                await firebase.firestore().collection('users').doc(credentials.user.uid).set({
                  name: name,
                  avatar: url
                })
              }
            );
          } catch (error) {
            console.log(error);
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (error) {
            console.log(error);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
