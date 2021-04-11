$(document).ready(function () {
    var url_string = window.location;
    var url = new URL(url_string);
    var event;
    var address;
    var eventID = url.searchParams.get("id");
    console.log(eventID);

    let query = db.collection('Location')
        .doc("" + eventID)
        .get()
        .then((doc) => {
            if (doc) {
                //console.log(doc.data());
                event = doc.data().Event;
                $("#event_title").text(doc.data().Event)
                address = doc.data().Address;
                $("#address").text("Address: " + doc.data().Address)
            } else {
                console.log("Document does not exist.");
            }
        })
        .catch((error) => {
            console.log("Error getting documents: " + error)
        })

    $("#eventButton").click(function() {
        var send = {
            "event": event,
            "address": address
        };
        console.log(send);
        localStorage.setItem('formdata', JSON.stringify(send));

        window.location.replace("booking.html");
    });
})
