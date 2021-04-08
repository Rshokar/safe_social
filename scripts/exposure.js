//function to write exposure report to database
function writeExposure() {
    //user variables
    var id;

    //time string
    var timeFrame = firebase.firestore.Timestamp.now().toDate();
    var restriction = new Date(timeFrame - 12096e5);
    var yyyy = restriction.getFullYear();
    var mm = restriction.getMonth() + 1;
    var dd = restriction.getDate();
    var dateString = yyyy + "-" + mm + "-" + dd;
    var reportedDate = document.getElementById("exposure").value;
    //console.log(reportedDate);
    //event variables
    var event;
    var eventDate;
    var location;
    var guest;
    var hostId;

    //if month is less than october (10), add a 0 to make it in dd format
    if (mm < 10) {
        dateString = yyyy + "-" + "0" + mm + "-" + dd;
    }
    //console.log(dateString);

    firebase.auth().onAuthStateChanged(function (user) {

        id = user.uid;
        //console.log(id);

        db.collection("Event")
            .where("date", ">=", dateString)
            .where("host.id", "==", id)
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    //console.log(doc.data().event);
                    //console.log(doc.data().guest);
                    event = doc.data().event;
                    eventDate = doc.data().date;
                    location = doc.data().location;
                    guest = doc.data().guest;
                    hostId = doc.data().host.id;
                    //console.log(hostId);
                });
            }).then(function () {
                //call the exposure collection to write to it
                var exposureRef = db.collection("Exposure");

                exposureRef.add({
                    reportedEvent: event,
                    eventDate: eventDate,
                    location: location,
                    guest: guest,
                    hostId: hostId,
                    reportedDate: reportedDate
                }).then(function () {
                    window.location.reload();
                });
            });


    })
}

//writeExposure();

//console.log(document.getElementById("exposure").value);

//function to read the exposure reports from database
function writeExposureGuest() {
    //user variables
    var id;
    var username;

    //time string
    var timeFrame = firebase.firestore.Timestamp.now().toDate();
    var restriction = new Date(timeFrame - 12096e5);
    var yyyy = restriction.getFullYear();
    var mm = restriction.getMonth() + 1;
    var dd = restriction.getDate();
    var dateString = yyyy + "-" + mm + "-" + dd;
    var reportedDate = document.getElementById("exposure").value;
    //console.log(reportedDate);
    //event variables
    var event;
    var eventDate;
    var location;
    var guest;
    var hostId;

    //if month is less than october (10), add a 0 to make it in dd format
    if (mm < 10) {
        dateString = yyyy + "-" + "0" + mm + "-" + dd;
    }
    //console.log(dateString);

    firebase.auth().onAuthStateChanged(function (user) {

        id = user.uid;
        username = user.displayName;
        //username = "plate demo";
        //id = "gtrupFnxSJPgiHOPe3ftCmp1SN42";
        //console.log(username);

        db.collection("Event")
            //.where("guest." + id + ".name", "==", username)
            .where("date", ">=", dateString)
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    console.log(doc.data().event);
                    //console.log(doc.data().guest);
                    /*event = doc.data().event;
                    eventDate = doc.data().date;
                    location = doc.data().location;
                    guest = doc.data().guest;
                    hostId = doc.data().host.id;
                    //console.log(hostId); */
                });
            }).then(function () {
                //call the exposure collection to write to it
                /*var exposureRef = db.collection("Exposure");
                
                exposureRef.add({
                    reportedEvent: event,
                    eventDate: eventDate,
                    location: location,
                    guest: guest,
                    hostId: hostId,
                    reportedDate: reportedDate
                }).then(function () {
                    window.location.reload();
                }); */
            });
    })
}

//writeExposureGuest();