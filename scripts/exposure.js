//function to write exposure report to database
function writeExposure() {
    var id;
    var time;

    firebase.auth().onAuthStateChanged(function (user) {
        var exposureRef = db.collection("Exposure");
        id = user.uid;
        time = firebase.firestore.Timestamp.now().toDate().toString();

        exposureRef.add({
            Event: document.getElementById("exposure").value,
            UID: id,
            Time: time
        }).then(function() {
            window.location.reload();
        });
    })
}

//console.log(document.getElementById("exposure").value);

//function to read the exposure reports from database
function readExposure() {
    firebase.auth().onAuthStateChanged(function (user) {
        var id = user.uid;
        let tableData = [];

        //query Exposure collection
        db.collection("Exposure").where("UID", "==", id)
        .get()
        .then(function(snap) {
            snap.forEach(function(doc) {
                $(document).ready(function() {
                    var event = doc.data().Event;
                    var time = doc.data().Time;
                    //console.log(event);
                    //console.log(time);

                    //add data to html
                    tableData.push($("<a href='#' class='list-group-item list-group-item-action'>" +
                    "<div class='d-flex w-100 justify-content-between'>" +
                    "<h5 class='mb-3'>" + event + "</h5>" +
                    "</div>" +
                    "<small class='text-muted'>" + time + "</small>" +
                    "</a>"));

                    //append html to webpage to display
                    $("#exposureContent").append(tableData);
                });
            })
        })
    })
}

readExposure();