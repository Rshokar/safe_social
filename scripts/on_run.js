let restricted = ["account.html", "exposures.html", "bookingconfirm.html", "booking.html", "events.html", "event_history.html", "event_details.html"]

/**
 * Checks if current user is logged in. If not and user is on restricted URL then they are redirected to login page. 
 * @author Ravinder Shokar 
 * @version 1.0
 */
auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log("user logged in")
    console.log(user.displayName)
    window.CURRENT_USER = user;
  } else {
    let url = window.location.href
    url = url.split("/")

    let page = url[url.length - 1]
    for (i = 0; i < restricted.length; i++) {
      if (page.includes(restricted[i])) {
        window.location.replace("http://127.0.0.1:5500/login.html")
      }
    }
  }
});

//The route of our website. 
const ROUTE = "http://127.0.0.1:5500/";
