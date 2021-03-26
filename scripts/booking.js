function setDataBooking() {
    var myEvent = document.getElementById("example-text-input").value;
    var myLocation = document.getElementById("example-password-input").value;
    var myDate = document.getElementById("example-date-input").value;
    var myTime = document.getElementById("example-time-input").value;

    var obj = {
        "event": myEvent,
        "location": myLocation,
        "date": myDate,
        "time": myTime
    }
    localStorage.setItem('formdata', JSON.stringify(obj));
}

setDataBooking();

