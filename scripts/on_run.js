console.log(firebase)
var userName = "test";
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user)
        console.log('User logged in')
    } else {
        console.log('User not logged in')
    }
});