import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';
import 'firebase/functions';
import { isLocalhost } from './helpers';
import { Notification as Toast } from 'rsuite';

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
export const functions = app.functions('us-central1');

export const messaging = firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.usePublicVapidKey(
    'BMJ6Stf5M5O7CrGLZXh38yDU9bdadxITo-3AeEtsYIADpbW0GaaVcM5rvG5tgL8xxDNv0ijZFP-4sAKQM-JTsBE'
  );
  messaging.onMessage(({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
    console.log(title, body);
  });
}

if (isLocalhost) {
  functions.useFunctionsEmulator('http://127.0.0.1:5001');
}
