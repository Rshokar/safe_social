let restricted = ["account.html", "exposures.html", "bookingconfirm.html", "booking.html"]

console.log(firebase)
var userName = "test";
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user)
        console.log('User logged in')
        console.log("Page location is " + window.location.href);

        let url = window.location.href
        url = url.split("/")

        let page = url[url.length - 1]

        for (i = 0; i < restricted.length; i++) {
            console.log()
            if (page == restricted[i]) {
                window.location.replace("http://127.0.0.1:5500/")
            }
        }

    } else {
        let url = window.location.href
        url = url.split("/")
        console.log(url[url.length - 1])
        console.log('User not logged in')
    }
});