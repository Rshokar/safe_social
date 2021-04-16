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
        //Get event name and address and display them in their appropriate locations in html
        event = doc.data().Event;
        $("#event_title").text(doc.data().Event)
        address = doc.data().Address;
        $("#address").text("Address: " + doc.data().Address);

        //create table and cycle through Activity array to append all attractions
        //to the html to list all attractions at the selected location
        let attractions = "<table>";
        for (let i = 0; i < doc.data().Activity.length; i++) {
          attractions += "<tr><td>" + doc.data().Activity[i] + "</td></tr>";
        }

        attractions += "</table>";

        $("#activity").append(attractions);
      } else {
        console.log("Document does not exist.");
      }
    })
    .catch((error) => {
      console.log("Error getting documents: " + error)
    })

  $("#eventButton").click(function () {
    var send = {
      "event": event,
      "address": address
    };
    console.log(send);
    localStorage.setItem('formdata', JSON.stringify(send));

    window.location.replace("booking.html");
  });
})
