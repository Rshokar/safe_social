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

    eventRef.add({
        Event: document.getElementById("event").innerHTML,
        Location: document.getElementById("location").innerHTML,
        Date: document.getElementById("date").innerHTML,
        Time: document.getElementById("time").innerHTML
    }).then(function () {
        window.location.replace("events.html");
    });
}

        //writeEvent();