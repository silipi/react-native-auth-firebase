import React, { createContext, useState } from 'react';
import firebase from '../database/firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider 
      value={{
        user: user,
        setUser: setUser,
        login: async (email, password) => {
          try {
            await firebase.firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.log(error);
          }
        },
        signup: async (email, password) => {
          try {
            await firebase.firebase.auth().createUserWithEmailAndPassword(email, password);
          } catch (error) {
            console.log(error);
          }
        },
        logout: async () => {
          try {
            await firebase.firebase.auth().signOut();
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
