/* eslint-disable quotes */

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// eslint-disable-next-line no-unused-vars
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chat-web-app-44a3a-default-rtdb.firebaseio.com',
});

// eslint-disable-next-line object-curly-spacing
const { sendFcm } = require('./src/fcm');

exports.sendFcm = sendFcm;
//   response.send('Hello from Firebase!');
// });
