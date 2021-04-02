

var myObj = JSON.parse(localStorage.getItem('formdata'));


$(document).ready(function () {
    document.getElementById("event").innerHTML = myObj.event;
    document.getElementById("location").innerHTML = myObj.location;
    document.getElementById("date").innerHTML = myObj.date;
    document.getElementById("time").innerHTML = myObj.time;
    renderGuest(myObj.guest);

})


//This meathod gets event guest from guestObj and displays them to HTML
function renderGuest(guestObj) {
    for (var guest in guestObj) {
        html = "<tr><td><span class='freind_name'>" + guestObj[guest].name
            + "</span></td></tr>"
        $('#guest_list').append(html);
    }
}


//write to database
$('#submit').click(function () {
    myObj.host = auth.currentUser.uid;
    console.log(myObj);

    db.collection("Event").add(myObj)
        .then(() => {
            console.log("Document successfully written! " + myObj);
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
})


//create guest collection within the created event
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
                }).then(function () {
                    window.location.replace("events.html");
                });
            })
        });
}