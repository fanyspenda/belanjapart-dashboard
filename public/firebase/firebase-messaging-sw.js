const { firebaseConfig } = require("./config");

importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js'
);

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/itwonders-web-logo.png',
    click_action: 'https://www.google.com/',
    data: {
      click_action: 'https://www.google.com/'
    }
  };

  self.addEventListener('notificationclick', function(event) {
    if (!event.action) {
      // Was a normal notification click
      self.clients.openWindow(event.notification.data.click_action, '_blank');
      event.notification.close();
      return;
    } else {
      event.notification.close();
    }
  });

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
