/* eslint-disable */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const database = admin.database();
const messaging = admin.messaging();

exports.sendFcm = functions
  .region('us-central1')
  .https.onCall(async (data, context) => {
    checkIfAuth(context);

    const { chatId, title, message } = data;

    const roomSnap = await database.ref(`/rooms/${chatId}`).once('value');

    if (!roomSnap.exists()) {
      return false;
    }

    const roomData = roomSnap.val();

    checkIfAllowed(context, transformToArr(roomData.admins));
    const fcmUsers = transformToArr(roomData.fcmUsers);
    const userTokenPromises = fcmUsers.map(uid => getUserTokens(uid));
    const result = await Promise.all(userTokenPromises);

    const tokens = result.reduce(
      (accTokens, userToken) => [...accTokens, ...userToken],
      []
    );

    if (tokens.length === 0) {
      return false;
    }

    const fcmMessage = {
      notification: {
        title: `${title} (${roomData.name})`,
        body: message,
      },
      tokens: tokens,
    };

    const batchResponse = await messaging.sendMulticast(fcmMessage);
    const failedTokens = [];

    if (batchResponse.failureCount > 0) {
      batchResponse.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(tokens[idx]);
        }
      });
    }

    const removePromises = failedTokens.map(token =>
      database.ref(`/fcm_tokens/${token}`).remove()
    );
    return Promise.all(removePromises).catch(err => err.message);
  });

function checkIfAuth(context) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'GAY', //'unauthenticated'
      'subodh likes banana 🍌' //you have to be signed in
    );
  }
}

function checkIfAllowed(context, chatAdmins) {
  if (!chatAdmins.includes(context.auth.uid)) {
    throw new functions.https.HttpsError(
      'BITCH', //'restricted'
      'no subodh is a whore 🦄' //'Restricted Access'
    );
  }
}

function transformToArr(snapVal) {
  return snapVal ? Object.keys(snapVal) : [];
}

async function getUserTokens(uid) {
  const userTokenSnap = await database
    .ref('/fcm_tokens')
    .orderByValue()
    .equalTo(uid)
    .once('value');

  if (!userTokenSnap.hasChildren()) {
    return [];
  }

  return Object.keys(userTokenSnap.val());
}
