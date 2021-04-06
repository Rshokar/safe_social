$(document).ready(function () {
    var url_string = window.location;
    var url = new URL(url_string);
    var eventID = url.searchParams.get("id");
    console.log(eventID);

    let query = db.collection('Event')
        .doc("" + eventID)
        .get()
        .then((doc) => {
            if (doc) {
                console.log(doc.data());
                $("#event_title").text(doc.data().event)
                $("#host").text("Host: " + doc.data().host.name)
                $("#date").text("Date: " + doc.data().date)
                $("#time").text("Time: " + doc.data().time)
                $("#location").text("Location: " + doc.data().location)

                guests = doc.data().guest;

                for (var guest in guests) {
                    console.log(guests[guest].name);
                    html =
                        `
                    <tr>
                        <td><span class='guest_name'>${guests[guest].name}</span></td>
                    </tr>
                    `
                    $('#guest_list').append(html);

                }
            } else {
                console.log("Document does not exist.");
            }
        })
        .catch((error) => {
            console.log("Error getting documents: " + error)
        })
})
