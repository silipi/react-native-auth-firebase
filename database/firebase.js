import firebase from 'firebase';

import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGK59aoykD_OW5LOnAOj9YX10L5toyfek",
  authDomain: "social-app-cb633.firebaseapp.com",
  projectId: "social-app-cb633",
  storageBucket: "social-app-cb633.appspot.com",
  messagingSenderId: "286925682810",
  appId: "1:286925682810:web:7d4d5ff25841bbb5dda3c3",
  measurementId: "G-Z6J4SP8KNX"
};

firebase.initializeApp(firebaseConfig);

export default firebase;