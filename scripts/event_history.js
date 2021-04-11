var d = new Date()
var date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay();

$(document).ready(function () {
  console.log(date);
  firebase.auth().onAuthStateChanged(function (user) {
    getHostedEvents(user, date);
    getGuestEvents(user, date);

    $("#host_button").click(function() {
      $("#guest_events").css("display", "none");
      $("#host_events").css("display", "block");
    });
    
    $("#guest_button").click(function() {
      $("#host_events").css("display", "none");
      $("#guest_events").css("display", "block");
    });

  })
})


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


function buildHTML(doc) {
  html = `
  <div id='${doc.id}' href='#' class='list-group-item list-group-item-action'>
    <div class='d-flex w-100 justify-content-between'>
      <h5 class='mb-1'>${doc.data().event}</h5>
      <small class='text-muted'></small>
    </div>
    <small class='text-muted date'>${doc.data().date}</small></br>
    <small class='text-muted location'>${doc.data().location}</small>
  <div>
  `
  return html;
}

function eventDetailsListner(id) {
  document.getElementById(id)
    .addEventListener('click', function () {
      myUrl = "http://127.0.0.1:5500/event_details.html?id=" + id;
      window.location.replace(myUrl);
    })
}
