/**
 * Custome JS for event_history.html=
 * @author Ravinder Shokar 
 * @version 1.0
 */

var d = new Date()
var date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay();


/**
 * This run everytime the page is loaded 
 * @author Ravindder Shokar 
 * @version 1.0
 */
$(document).ready(function () {
  console.log(date);
  firebase.auth().onAuthStateChanged(function (user) {
    getHostedEvents(user, date);
    getGuestEvents(user, date);

    $("#host_button").click(function () {
      $("#guest_events").css("display", "none");
      $("#host_events").css("display", "block");
    });

    $("#guest_button").click(function () {
      $("#host_events").css("display", "none");
      $("#guest_events").css("display", "block");
    });

  })
})

/**
 * This queries the firbase DB for any events which the Current User is the host
 * @param {*} user obj which containes user ID and user Name
 * @param {*} date current date. 
 */
function getHostedEvents(user, date) {
  query = db.collection('Event')
    .where('host.id', '==', user.uid)
    .where('date', '<', date)
  query.get().then(function (snap) {
    snap.forEach(function (doc) {
      html = buildHTML(doc)
      $("#host_events").append(html)
      eventDetailsListner(doc.id)
    })
  })
}

/**
 * Queries the DB for evenets that current user is a guest. 
 * @param {*} user obj which contains user ID and user Name.
 * @param {*} date current date
 */
//=============================================================
//THIS DOES NOT WORK THIS DOES NOT WORK THIS DOES NOT WORK THIS
//=============================================================
function getGuestEvents(user, date) {
  query = db.collection('Event')
    .where('guest.' + user.uid + ".name", '==', user.displayName)
  query.get().then(function (snap) {
    snap.forEach(function (doc) {
      if (doc.data().date < date) {
        html = buildHTML(doc)
        $("#guest_events").append(html)
        eventDetailsListner(doc.id)
      }
    })
  })
}


/**
 * This functions builds the HTML that will dispaly event details
 * @param {} eventDoc is the event object returned from DB
 * @returns html that contains event details.
 */
function buildHTML(eventDoc) {
  html = `
  <div id='${eventDoc.id}' href='#' class='list-group-item list-group-item-action'>
    <div class='d-flex w-100 justify-content-between'>
      <h5 class='mb-1'>${eventDoc.data().event}</h5>
      <small class='text-muted'></small>
    </div>
    <small class='text-muted date'>${eventDoc.data().date}</small></br>
    <small class='text-muted location'>${eventDoc.data().location}</small>
  <div>
  `
  return html;
}

/**
 * This event listner redirects user to event_details page with event ID in URL/  
 * @param {} id event ID
 */
function eventDetailsListner(id) {
  document.getElementById(id)
    .addEventListener('click', function () {
      myUrl = "http://127.0.0.1:5500/event_details.html?id=" + id;
      window.location.replace(myUrl);
    })
}
