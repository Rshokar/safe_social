

var myObj = JSON.parse(localStorage.getItem('formdata'));
var guestObj = myObj.guest;

delete myObj.guest;

console.log(guestObj)
console.log(myObj)
//When page is loaded locat storage contents are displayed to HTML. 
$(document).ready(function () {
    document.getElementById("event").innerHTML = myObj.event;
    document.getElementById("location").innerHTML = myObj.location;
    document.getElementById("date").innerHTML = myObj.date;
    document.getElementById("time").innerHTML = myObj.time;
    renderGuest(guestObj);
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
    host = {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid
    }
    myObj.host = host;

    console.log(myObj);

    db.collection("Event").add(myObj)
        .then((docRef) => {
            console.log("Document successfully written! " + myObj);
            writeGuestDB(guestObj, docRef.id)
            window.location.replace(ROUTE + "events.html");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
})


//create guest collection within the created event
function writeGuests(docRef, guest) {
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

/**
 * This function writes all guest to the DB. This is fairly inefficient and was a quick fix. 
 * It does a query for each guest. 
 * @param {} inObj Is the the object containing freinds.  
 * @param docRef is the evnet ID. 
 */
function writeGuestDB(inObj, docId) {
    for (guest in inObj) {
        obj = {
            name: guestObj[guest]['name']
        }
        console.log(obj);
        console.log(docId)
        db.collection('Event')
            .doc(docId)
            .collection('guest')
            .doc(guest)
            .set(obj)
            .then(function (docRef) {
                console.log("Added guest to event DB");
            })
        console.log(guest);
    }
}