let restricted = ["account.html", "exposures.html", "bookingconfirm.html", "booking.html", "events.html"]

console.log(firebase)
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user)
        console.log('User logged in')
        console.log("Page location is " + window.location.href);
    } else {
        let url = window.location.href
        url = url.split("/")

        let page = url[url.length - 1]
        console.log(page)
        for (i = 0; i < restricted.length; i++) {
            if (page == restricted[i]) {
                window.location.replace("http://127.0.0.1:5500/login.html")
            }
        }
    }
});