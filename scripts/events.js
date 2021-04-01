//this function prints the events that the user is part of to the html page
function readEvent() {
  var entryCounter;
  
  firebase.auth().onAuthStateChanged(function (user) {
    //console.log(user.uid);
    var id = user.uid;
    let tableData = [];
    entryCounter = 0;

    db.collection("Event").where("UID", "==", id)
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          $(document).ready(function () {

            var event = doc.data().Event;
            var date = doc.data().Date;

            //console.log(location);
            //console.log(date);
            //console.log(snap.size);
            //if a entry is found in database, increment counter and print data to page
            if (snap.size > 0) {
              entryCounter++;

              //adds the html containing the event data to the tableData array
              tableData.push($("<a href='#' class='list-group-item list-group-item-action'>" +
                "<div class='d-flex w-100 justify-content-between'>" +
                "<h5 class='mb-1'>" + event + "</h5>" +
                "<small class='text-muted'>A few seconds ago</small>" +
                "</div>" +
                "<small class='text-muted'>" + date + "</small>" +
                "</a>"));

              //append tableData to html page
              $("#content").append(tableData);
            }
          });
        })
      })
  });

  //check if there are any entries
  checkNumberOfEntries(entryCounter);
}

readEvent();

//this function checks if there are any events that the user is part of in the database
function checkNumberOfEntries(entries) {
  if (entries == 0) {
    let msg = $("<h1>There are no events created yet</h1>");
    $("#content").append(msg);
  }
}