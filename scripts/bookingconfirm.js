//print data from localstorage
function getDataBooking2() {
    var myObj = JSON.parse(localStorage.getItem('formdata'));
    console.log(myObj);
    document.getElementById("event").innerHTML = myObj.event;
    document.getElementById("location").innerHTML = myObj.location;
    document.getElementById("date").innerHTML = myObj.date;
    document.getElementById("time").innerHTML = myObj.time;
}

getDataBooking2();

//write to database
function writeEvent() {
    var eventRef = db.collection("Event");
    var id;

    firebase.auth().onAuthStateChanged(function(user) {
        id = user.uid;
        console.log(id);

        eventRef.add({
            Event: document.getElementById("event").innerHTML,
            Location: document.getElementById("location").innerHTML,
            Date: document.getElementById("date").innerHTML,
            Time: document.getElementById("time").innerHTML,
            UID: id
        }).then(function () {
            window.location.replace("events.html");
        });
    });

    
}

//create guest collection
function writeGuests() {

    //query database to get doc id where event is the event name
    db.collection("Event").where("Event", "==", document.getElementById("event").innerHTML)
    .get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        console.log(doc.id);
        var guests = db.collection("Event").doc(doc.id).collection("Guests");

    //add data to the guests collection
    guests.add({
        Test: "Testing"
    });
    });
});

    
    
}

//writeGuests();