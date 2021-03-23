function setDataBooking() {
    var myEvent = document.getElementById("example-text-input").value;
    var myEmail = document.getElementById("example-email-input").value;
    var myPhone = document.getElementById("example-tel-input").value;
    var myLocation = document.getElementById("example-password-input").value;
    var myDate = document.getElementById("example-date-input").value;
    var myTime = document.getElementById("example-time-input").value;

    var obj = {
        "event": myEvent,
        "email": myEmail,
        "phone": myPhone,
        "location": myLocation,
        "date": myDate,
        "time": myTime
    }
    console.log(obj);
    localStorage.setItem('formdata', JSON.stringify(obj));
}

setDataBooking();