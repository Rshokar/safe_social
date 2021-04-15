/**
 * This is the custom js for event_details.html.
 * @author Ravinder Shokar
 * @version 1.0
 */
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
        host = isHost(doc.data().host.id)
        updatePageDetails(doc)
        renderGuest(host);
        if (!host) {
          $(".remove").remove()
        };
      } else {
        console.log("Document does not exist.");
      }
    })
    .catch((error) => {
      console.log("Error getting documents: " + error)
    })

  /** Renders all messages to group chat. */
  db.collection("Event")
    .doc(eventID)
    .collection("chat")
    .orderBy('date')
    .onSnapshot((snap) => {
      snap.docChanges().forEach(function (change) {
        console.log(change.doc.data());
        message = change.doc.data();
        console.log()
        html = buildMessageHtml(
          message.UID,
          message.message,
          message.displayName,
          message.date,
          "",
          ""
        )
        $("#messages").append(html);
      })
    });
})

/** Updates event title, host, date, time, and location. */
function updatePageDetails(doc) {
  $("#event_title").text(doc.data().event)
  $("#host").text("Host: " + doc.data().host.name)
  $("#date").text("Date: " + doc.data().date)
  $("#time").text("Time: " + doc.data().time)
  $("#location").text("Location: " + doc.data().location)
}



/**
 * Verify that current user is host of event. 
 */
function isHost(hostID) {
  if (hostID == auth.currentUser.uid) {
    console.log("Host User");
    return true;
  } else {
    console.log("Guest User");
    return false;
  }
}

/**
 * This class queries the DB for guest attending event. 
 * @param {*} isHost true or false value if current user 
 * is host of event. 
 */
function renderGuest(isHost) {
  db.collection("Event")
    .doc(eventID)
    .collection("guest")
    .orderBy('name')
    .onSnapshot((snap) => {
      snap.docChanges().forEach(function (change) {
        console.log("change", change);
        if (change.type == "added") {
          console.log("You have added a guest.");
          guest = change.doc.data();
          buildGuestHtml(change.doc.id, guest.name, isHost);
        } else {
          console.log("user has been removed.")
        }
      })
    });
}

/**
 * Builds the guest list in the HTML document.
 * @param guests is a list of guest. 
 */
function buildGuestHtml(id, name, ishost) {
  if (ishost) {
    html =
      `
            <tr>
                <td><span class='guest_name'>${name}</span></td>
                <td><button id=${id} class='remove'>Remove</button></td>
            </tr>
      `
  } else {
    html =
      `
        <tr>
          <td><span class='guest_name'>${name}</span></td>
        </tr>
      `
  }

  $('#guest_list').append(html);
  if (ishost) {
    uninviteFreindListner(id);
  }
}

/**
 * Builds the freinds list in #freinds_list.
 * @param id is the id of the guest user.
 * @param name is the name of the guest user. 
 */
function buildFreindHtml(id, name) {
  console.log("Build freinds html", name);
  html =
    `
            <tr>
                <td><span class='guest_name'>${name}</span></td>
                <td><button id=${id} class='add'>Invite</button></td>
            </tr>
      `
  $('#freinds_list table').append(html);
  console.log(name);
  inviteFreindListner(id, name);

}

/**
 * Add an event listner to buttons. When clicked will remove from 
 * html and db
 * @param id the id of the guest who is removed. 
 */
function uninviteFreindListner(id) {
  document.getElementById(id)
    .addEventListener('click', function () {
      db.collection('Event')
        .doc(eventID)
        .collection('guest')
        .doc(id)
        .delete()
        .then(() => {
          $("#" + id).parent().parent().remove();
        })

    })
}

/**
 * Add an event listner to freinds list buttons. When clicked will remove from 
 * html, and then added to event guest list. 
 * @param id the id of the guest who has been invited removed.
 * @param name the name of the guest being invited 
 */
function inviteFreindListner(id, inName) {
  $("#" + id).on("click", function () {
    console.log("clicked", $(this));
    console.log("ID", id);
    console.log("Name", inName);
    db.collection('Event')
      .doc(eventID)
      .collection('guest')
      .doc(id)
      .set({ name: inName })
      .then(() => {
        console.log(id);
        console.log("Freind has been added to the guest list.", { name: inName });
        $(this).parent().parent().remove()
      })
  })
}

/**
 * This click function opens the add freind layover on event_details.html.
 */
$("#invite_freinds").click(function () {
  console.log("Invite freinds has been clicked");
  renderFreinds()
  $('#freinds_list').slideDown(1000);
})


/**
 * This click function closes the add freind layover on event_details.html.
 */
$("#back").click(function () {
  $("#freinds_list table").empty();
  $('#freinds_list').slideUp(1000);
})

/**
 * Queries freinds from db and renders them in #freinds_list
 */
function renderFreinds() {
  db.collection("users")
    .doc(auth.currentUser.uid)
    .collection('freinds')
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        if ($("#" + doc.id).length) {
          console.log("Freind already invited", doc.data());
        } else {
          buildFreindHtml(doc.id, doc.data().name)
        }
      })
    })
}

/** Slides group chat down into viewport*/
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
  updateChatCollection(messageObj, date)
  $("#message_input input").val("");
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


/** Updates the chat collection. */
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