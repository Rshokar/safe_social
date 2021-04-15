//this function prints the events that the user is part of to the html page
$(document).ready(function () {
  firebase.auth().onAuthStateChanged(function (user) {
    console.log(user.uid)
    var id = user.uid;
    var username = user.displayName;
    entryCounter = 0;

    /**
     * @author Brendan Lin
     * @version 1.0
     * This DB query gets all events in which current user is host. 
     */
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
            var tableData = [];
            tableData.push(doc.data().event, doc.data().date, doc.data().location, doc.id);
            //console.log(tableData);
            //console.log(createEvent(tableData));
            $("#host_events").append(createEvent(tableData));
            eventDetailsListner(doc.id);

            /*tableData.push($(
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
            $("#host_events").append(tableData);
            eventDetailsListner(doc.id); */
          }
        })
      });

    db.collectionGroup('guest')
      .where("name", '==', username)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.ref.path);
          console.log(doc.ref.parent.parent.id)
          db.collection('Event')
            .doc(doc.ref.parent.parent.id)
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log("Document data:", doc.data());
                console.log("Document data:", doc.id);
                var tableData = [];
                tableData.push(doc.data().event, doc.data().date, doc.data().location, doc.id);
                $("#guest_events").append(createEvent(tableData));
                console.log("Document data:", doc.id);
                eventDetailsListner(doc.id);

              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
        });
      })
    /**
    var tableData2 = [];
    tableData2.push(doc.data().event, doc.data().date, doc.data().location, doc.id);
    //console.log(tableData2);
    //console.log(createEvent(tableData2));
    $("#host_events").append(createEvent(tableData2));
    eventDetailsListner(doc.id);
    /*tableData2.push($(`
      <div id='${doc.id}' href='#' class='list-group-item list-group-item-action'>
        <div class='d-flex w-100 justify-content-between'>
          <h5 class='mb-1'>${doc.data().event}</h5>
          <small class='text-muted'></small>
        </div>
        <small class='text-muted date'>${doc.data().date}</small></br>
        <small class='text-muted location'>${doc.data().location}</small>
      </div>"));
      `))
    //append tableData2 to html
    $("#guest_events").append(tableData2);
    eventDetailsListner(doc.id); */

  });

  $("#host_button").click(function () {
    $("#guest_events").css("display", "none");
    $("#host_events").css("display", "block");
  });

  $("#guest_button").click(function () {
    $("#host_events").css("display", "none");
    $("#guest_events").css("display", "block");
  });
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