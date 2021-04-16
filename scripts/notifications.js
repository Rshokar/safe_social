//This script is what allows the user to get notified
const messaging = firebase.messaging();
messaging.requestPermission()
.then(function() {
    console.log('Have Permission');
    return messaging.getToken();
})
.then(function(token) {
    console.log(token)
})
.catch(function(err) {
    console.log('Error')
})

messaging.setBackgroundHandler(function(payload) {
    console.log('onMessage', payload)
});