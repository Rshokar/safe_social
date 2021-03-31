
function readEvent() {

    var id = firebase.auth().onAuthStateChanged(function (user) {
      console.log(user.uid);

      var id = user.uid;
      let tableData = [];

      db.collection("Event").where("UID", "==", id)
        .get()
        .then(function (snap) {
          snap.forEach(function (doc) {
            $(document).ready(function () {

              var location = doc.data().Location;
              var date = doc.data().Date;
              //console.log(location);
              //console.log(date);

                tableData.push($("<a href='#' class='list-group-item list-group-item-action'>" +
                "<div class='d-flex w-100 justify-content-between'>" +
                "<h5 class='mb-1'>" + location + "</h5>" +
                "<small class='text-muted'>A few seconds ago</small>" +
                "</div>" +
                "<small class='text-muted'>" + date + "</small>" +
                "</a>"));

              console.log(tableData[1]);
              $("#eventlist").append(tableData);
            });
          })
        })
    });
  }