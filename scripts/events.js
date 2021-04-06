//this function prints the events that the user is part of to the html page
$(document).ready(function () {
  firebase.auth().onAuthStateChanged(function (user) {
    console.log(user.uid)
    var id = user.uid;
    let tableData = [];
    entryCounter = 0;

    db.collection("Event").where("host.id", "==", id)
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          console.log(doc.data());

          //console.log(location);
          //console.log(date);
          //console.log(snap.size);
          //if a entry is found in database, increment counter and print data to page
          if (snap.size > 0) {
            entryCounter++;

            //adds the html containing the event data to the tableData array
            tableData.push($(
              `
              <div id='${doc.id}' href='#' class='list-group-item list-group-item-action'>
                <div class='d-flex w-100 justify-content-between'>
                  <h5 class='mb-1'>${doc.data().event}</h5>
                  <small class='text-muted'></small>
                </div>
                <small class='text-muted date'>${doc.data().date}</small></br>
                <small class='text-muted location'>${doc.data().location}</small>
              </div>"));
              `))
            //append tableData to html page
            $("#content").append(tableData);
            eventDetailsListner(doc.id);
          }
        })
      })
  })
})


function eventDetailsListner(id) {
  document.getElementById(id)
    .addEventListener('click', function () {
      myUrl = "http://127.0.0.1:5500/event_details.html?id=" + id;
      window.location.replace(myUrl);
    })
}


//this function checks if there are any events that the user is part of in the database
function checkNumberOfEntries(entries) {
  if (entries == 0) {
    let msg = $("<h1>There are no events created yet</h1>");
    $("#content").append(msg);
  }
}