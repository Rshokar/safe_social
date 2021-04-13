firebase.initializeApp(config);
var storage = firebase.storage();
var storageRef = storage.ref();
var tangRef = storageRef.child('images/8009894933_898f81b5ec_b.jpg');

// First we sign in the user anonymously
firebase.auth().signInAnonymously().then(function() {
  // Once the sign in completed, we get the download URL of the image
  tangRef.getDownloadURL().then(function(url)                             {
    // Once we have the download URL, we set it to our img element
    document.querySelector('img').src = url;
    
  }).catch(function(error) {
    // If anything goes wrong while getting the download URL, log the error
    console.error(error);
  });
});