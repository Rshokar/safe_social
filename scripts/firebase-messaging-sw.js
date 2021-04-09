importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-messaging.js');

const messaging = firebase.messaging();
messaging.setBackgroundHandler(function(payload) {
    const popup = "test";
    const description = "testing"

    return self.registration.showNotification(popup, description);
})