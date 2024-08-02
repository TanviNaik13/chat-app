/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyB2xBYMjSgBQIAe1EAQQ8O0eZRWQJaIxwc',
  authDomain: 'chat-web-app-44a3a.firebaseapp.com',
  projectId: 'chat-web-app-44a3a',
  storageBucket: 'chat-web-app-44a3a.appspot.com',
  messagingSenderId: '580943048736',
  appId: '1:580943048736:web:9ca640f741d5e12a310c45',
});

firebase.messaging();
