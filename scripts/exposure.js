/**
 * @author Brendan Lin
 */
//function to write exposure report to database
function writeExposureHost() {
    //user variables
    var id;

    //time string
    var reportedDate = document.getElementById("exposure").value;
    var convert = new Date(reportedDate);
    var restriction = new Date(convert - 12096e5);
    var yyyy = restriction.getFullYear();
    var mm = restriction.getMonth() + 1;
    var dd = restriction.getDate();
    var dateString = yyyy + "-" + mm + "-" + dd;

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

        db.collection("Event")
            .where("date", ">=", dateString)
            .where("host.id", "==", id)
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    event = doc.data().event;
                    eventDate = doc.data().date;
                    location = doc.data().location;
                    guest = doc.data().guest;
                    hostId = doc.data().host.id;

                    //call the exposure collection to write to it
                    var exposureRef = db.collection("Exposure");

                    if (guest != undefined) {
                        exposureRef.add({
                            reportedEvent: event,
                            eventDate: eventDate,
                            location: location,
                            guest: guest,
                            hostId: hostId,
                            reportedDate: reportedDate
                        });
                    } else {
                        exposureRef.add({
                            reportedEvent: event,
                            eventDate: eventDate,
                            location: location,
                            hostId: hostId,
                            reportedDate: reportedDate
                        });
                    }    
                });
            }).then(function () {
                writeExposureGuest();
            });
    })
}

//function to read the exposure reports from database
function writeExposureGuest() {
    //user variables
    var id;
    var username;

    //time string
    var reportedDate = document.getElementById("exposure").value;
    var convert = new Date(reportedDate);
    var restriction = new Date(convert - 12096e5);
    var yyyy = restriction.getFullYear();
    var mm = restriction.getMonth() + 1;
    var dd = restriction.getDate();
    var dateString = yyyy + "-" + mm + "-" + dd;

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

    firebase.auth().onAuthStateChanged(function (user) {

        id = user.uid;
        username = user.displayName;

        db.collection("Event")
            .where("guest." + id + ".name", "==", username)
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    if (doc.data().date >= dateString) {
                        console.log(doc.data().event);
                        event = doc.data().event;
                        eventDate = doc.data().date;
                        location = doc.data().location;
                        guest = doc.data().guest;
                        hostId = doc.data().host.id;

                        //call the exposure collection to write to it
                        var exposureRef = db.collection("Exposure");

                        if (guest != undefined) {
                            exposureRef.add({
                                reportedEvent: event,
                                eventDate: eventDate,
                                location: location,
                                guest: guest,
                                hostId: hostId,
                                reportedDate: reportedDate
                            });
                        } else {
                            exposureRef.add({
                                reportedEvent: event,
                                eventDate: eventDate,
                                location: location,
                                hostId: hostId,
                                reportedDate: reportedDate
                            });
                        }    
                    }
                });
            }).then(setTimeout(function () {
                window.location.href = 'account.html?reload=true';
            }, 1000));
    })
}

function setExposureConfirmation() {
    let urlBar = window.location;
    let url = new URL(urlBar);
    let confirmationCheck = url.searchParams.get("reload");

    if (confirmationCheck) {
        let msg = "<h2>Exposure Submission Successful</h2>";
        $("#confirm").append(msg);
    }
}

setExposureConfirmation();