var url_string = window.location;
var url = new URL(url_string);
var eventID = url.searchParams.get("id");

$(document).ready(function () {

  console.log(eventID);

  let eventQuery = db.collection('Event')
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

  /** Renders all messages to group chat. */
  let chatQuery = db.collection("Event")
    .doc(eventID)
    .collection('chat')
    .orderBy('date')
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        message = doc.data();
        html = buildMessageHtml(message.UID, message.message, message.displayName, message.date, 'Sent', doc.id)
        $('#messages').append(html);
      })
    })
})

/** Slides group chat down in to viewport*/
$("#show_chat").click(function () {
  $('#group_chat').slideDown(1000);
})


/** Slides group chat up out of viewport */
$("#hide_chat").click(function () {
  $('#group_chat').slideUp(1000);
})

/* When clicked user submits a message to DB*/
$("#message_submit").click(function () {
  let date = new Date().toLocaleString();
  let message = $("#message_input input").val();
  messageObj = buildMessageObj(message, date);
  message = buildMessageHtml(
    auth.currentUser.uid,
    message,
    auth.currentUser.displayName,
    date,
    "Submitted",
    "none"
  )
  console.log(message);
  $("#messages").append(message);
  updateChatCollection(messageObj, date)
})


/** Builds message JSON objects. */
function buildMessageObj(message, now) {
  obj = {
    UID: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    message: message,
    date: now
  }
  return obj;
}


/** Builds message HTML elements. If inputed uID == current UID then 
 * class is set to current_user. Otherwise class is set to user. 
 */
function buildMessageHtml(uID, message, name, date, status, messageID) {

  let type = "current_user";
  if (!(uID == auth.currentUser.uid)) {
    type = "user";
    status = "";
    console.log(type);
  }
  html =
    `
    <div class='${type}' id="${messageID}">
      <p class='message_bubble'>
        ${message}
      </p>
      <span>${name}</span>
      <span>${date}</span>
      <span class="status">${status}</span>
    </div>
  `
  return html;
}


/** Updates the chate collection. */
function updateChatCollection(obj) {
  db.collection("Event")
    .doc(eventID)
    .collection('chat')
    .add(obj)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id)
      $('#none').attr("id", docRef.id);
      $('#' + docRef.id + " " + '.status').html('Sent');
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

