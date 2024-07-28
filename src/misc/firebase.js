import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyB2xBYMjSgBQIAe1EAQQ8O0eZRWQJaIxwc',
  authDomain: 'chat-web-app-44a3a.firebaseapp.com',
  projectId: 'chat-web-app-44a3a',
  storageBucket: 'chat-web-app-44a3a.appspot.com',
  messagingSenderId: '580943048736',
  appId: '1:580943048736:web:9ca640f741d5e12a310c45',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
