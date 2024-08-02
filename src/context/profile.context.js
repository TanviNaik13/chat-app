import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { auth, database, messaging } from '../misc/firebase';

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStatusRef;
    let tokenUnsub;

    const authUnsub = auth.onAuthStateChanged(async authObj => {
      if (authObj) {
        console.log('authuid', authObj.uid);
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            avatar,
            createdAt,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setLoading(false);
        });

        database.ref('.info/connected').on('value', snapshot => {
          if (!!snapshot.val() == false) {
            return;
          }

          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusRef.set(isOnlineForDatabase);
            });
        });

        if (messaging) {
          try {
            const currentToken = await messaging.getToken();
            if (currentToken) {
              await database
                .ref(`/fcm_tokens/${currentToken}`)
                .set(authObj.uid);
            }
          } catch (error) {
            console.log('errroooorrrrr:', error.message);
          }

          tokenUnsub = messaging.onTokenRefresh(async () => {
            try {
              const currentToken = await messaging.getToken();
              if (currentToken) {
                await database
                  .ref(`/fcm_tokens/${currentToken}`)
                  .set(authObj.uid);
              }
            } catch (error) {
              console.log('errroooorrrrr:', error.message);
            }
          });
        }
      } else {
        if (userRef) {
          userRef.off();
        }
        if (userStatusRef) {
          userStatusRef.off();
        }

        if (tokenUnsub) {
          tokenUnsub();
        }

        database.ref('.info/connected').off();
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      authUnsub();
      database.ref('.info/connected').off();
      if (userRef) {
        userRef.off();
      }
      if (userStatusRef) {
        userStatusRef.off();
      }
      if (tokenUnsub) {
        tokenUnsub();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ loading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
