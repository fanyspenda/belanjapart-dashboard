/* eslint-disable no-console */
import app from 'firebase/app';
import firebase from 'firebase';
import 'firebase/messaging';
import 'firebase/auth';
import iziToast from 'izitoast';

import { saveFCM } from '@actions/auth.action';
import { VAPID_KEY, URL_ADMIN } from '../../src/config/keys';
import { firebaseConfig } from './config';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.messaging = firebase.messaging();

    this.messaging.usePublicVapidKey(VAPID_KEY);
    this.messaging
      .requestPermission()
      .then(() => {
        window.innerHTML = 'Notification permission granted.';
        console.log('Notification permission granted.');
      })
      .catch(err => {
        window.innerHTML = `${window.innerHTML}; ${err}`;
        console.log('Unable to get permission to notify.', err);
      });

    // this.messaging.onMessage(function(payload) {
    //   console.log('Message received. ', payload);
    //   var notificationTitle = payload.data.title;
    //   const notificationOptions = {
    //     body: payload.data.body,
    //     icon: payload.data.icon,
    //     image: payload.data.image,
    //     click_action: 'https://www.examples.com/' + payload.data.url, // To handle notification click when notification is moved to notification tray
    //     data: {
    //       click_action: 'https://www.examples.com/' + payload.data.url
    //     }
    //   };
    //   var notification = new Notification(
    //     notificationTitle,
    //     notificationOptions
    //   );
    // });
  }
}

export default new Firebase();

export async function signInAnonymously() {
  return new Promise((resolve, reject) => {
    app
      .auth()
      .signInAnonymously()
      .then(idToken => {
        resolve(console.log(idToken));
      })
      .catch(error => {
        resolve(console.log('ini error', error));
      });
  });
}

export async function getIdToken() {
  return new Promise((resolve, reject) => {
    const unsubscribe = app.auth().onAuthStateChanged(user => {
      unsubscribe();
      if (user) {
        user.getIdToken().then(
          idToken => {
            resolve(console.log('ini token', idToken));
          },
          error => {
            resolve(console.log('ini error', error));
          }
        );
      } else {
        resolve(console.log('ini error', user));
      }
    });
  });
}

export async function getCurrentToken() {
  return new Promise((resolve, reject) => {
    app
      .auth()
      .currentUser.getIdToken()
      .then(idToken => {
        resolve(console.log('ini token', idToken));
      })
      .catch(error => {
        resolve(console.log('ini error', error));
      });
  });
}

export async function getFcmToken() {
  const messaging = firebase.messaging();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      window.navigator.serviceWorker
        .register(`${URL_ADMIN}/firebase-messaging-sw.js`)
        .then(
          async registration => {
            // Registration was successful
            const fcmToken = await messaging
              .getToken()
              .then(currentToken => {
                if (currentToken) {
                  // console.log('FCM Token', currentToken);
                  return {
                    success: true,
                    message: currentToken
                  };
                }
                // Show permission request.
                iziToast.error({
                  title: 'Error',
                  position: 'topRight',
                  message:
                    'No Instance ID token available. Request permission to generate one.'
                });
                // console.log(
                //   'No Instance ID token available. Request permission to generate one.'
                // );
                return {
                  success: false,
                  message: `No Instance ID token available. Request permission to generate one.`
                };
                // Show permission UI.
                //   updateUIForPushPermissionRequired();
                //   setTokenSentToServer(false);
              })
              .catch(err => {
                iziToast.error({
                  title: 'Error',
                  position: 'topRight',
                  message: `An error occurred while retrieving token, ${err}`
                });
                // console.log('An error occurred while retrieving token. ', err);
                return {
                  success: false,
                  message: `An error occurred while retrieving token, ${err}`
                };
                // showToken('Error retrieving Instance ID token. ', err);
                // setTokenSentToServer(false);
              });
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope
            );
            window.fcnToken = fcmToken.message;
            return fcmToken;
          },
          err => {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
          }
        );
    });
  }
}

// app.auth().currentUser.getIdToken()
//   .then(idToken => {
//     console.log('kok dapet', idToken);
//   })
//   .catch(error => {
//     console.log('kok error', error);
//   });

// Initialize Firebase
// messaging.setBackgroundMessageHandler(payload => {
//   const { title } = payload.notification;
//   console.log('payload', payload.notification.icon);
//   const options = {
//     body: payload.notification.body,
//     icon: payload.notification.icon
//   };
//   return window.self.registration.showNotification(title, options);
// });

// messaging.onTokenRefresh(() => {
//   messaging
//     .getToken()
//     .then(refreshedToken => {
//       console.log('Token refreshed.', refreshedToken);
//       // Indicate that the new Instance ID token has not yet been sent to the
//       // app server.
//       // setTokenSentToServer(false);
//       // Send Instance ID token to app server.
//       // sendTokenToServer(refreshedToken);
//       // ...
//     })
//     .catch(err => {
//       console.log('Unable to retrieve refreshed token ', err);
//       // showToken('Unable to retrieve refreshed token ', err);
//     });
// });

// messaging.onMessage(payload => {
//   console.log('Message received. ', payload);
//   // ...
// });
