
/**
 * @author Brendan Lin
 */
var guestObj = {}

var sendObj = JSON.parse(localStorage.getItem('formdata'));

$(document).ready(function () {
  console.log(sendObj.address);
  //Check if the Event and Location fields have data sent from discover
  if (sendObj.address != undefined) {
    document.getElementById("example-text-input").value = sendObj.event;
    document.getElementById("example-password-input").value = sendObj.address;
  }

});

//This function completes the Event data collection process. It gets data from 
//forms on booking.html and guestObj.  
$("#submit").click(function () {
  var myEvent = document.getElementById("example-text-input").value;
  var myLocation = document.getElementById("example-password-input").value;
  var myDate = document.getElementById("example-date-input").value;
  var myTime = document.getElementById("example-time-input").value;

  var obj = {
    "event": myEvent,
    "location": myLocation,
    "date": myDate,
    "time": myTime,
    guest: guestObj
  }

  console.log(obj);
  localStorage.setItem('formdata', JSON.stringify(obj));

  window.location.replace(ROUTE + "bookingconfirm.html");
})

/**
 * This meathod gets user freinds from DB and displays them to HTML.
 * @author Ravinder Shokar
 * @version 1.0
 */
function renderGuest() {
  for (var guest in guestObj) {
    html = "<tr><td><span class='freind_name'>" + guestObj[guest].name
      + "</span></td><td><button id='" + guest + "' class='action_button remove'>Remove</button></td></tr>"
    $('#guest_list').append(html);
    uninviteFreindListner(guest);
  }
}

/**
 * This meathod gets user freinds from DB and displays them to HTML
 * @author Ravinder Shokar
 * @version 1.0
 */
function renderFreinds() {
  var freindsDoc = db.collection('users').doc(auth.currentUser.uid).collection('freinds');
  freindsDoc.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (guestObj.hasOwnProperty(doc.id)) {
        pass;
      } else {
        console.log(doc.id, " => ", doc.data());
        let user = doc.data();
        html = "<tr><td><span class='freind_name'>" + user.name
          + "</span></td><td><button id='" + doc.id + "' class='action_button add'>Invite</button></td></tr>"
        $('#freinds_list table').append(html);
        inviteFreindListner(doc.id, user.name)
      }
    });
  });
}

/**
 * This function is targeted at back button on booking.html. 
 * It also empties the freinds list html and displays the guest html.  
 * @author Ravinder Shokar
 * @version 1.0 
 */
$("#back").click(function () {
  renderGuest()
  $("#freinds_list table").empty()
  $('#freinds_list').css({
    'display': 'none'
  })
})

/**
 * This function is targeted at add freinds button on booking.html
 * It also empties the html guest list and displays freinds list. 
 * @author Ravinder Shokar 
 * @version 1.0
 */
$("#add_freinds").click(function () {
  renderFreinds()
  $("#guest_list").empty()
  $('#freinds_list').css({
    'display': 'block'
  })
})

/**
 * This event listner adds user to the guest list obj and HTML.
 * @param {*} id Guest ID 
 * @param {*} name Guest Name
 */
function inviteFreindListner(id, name) {
  document.getElementById(id)
    .addEventListener('click', function () {
      guestObj[id] = {
        name
      }
      $("#" + id).parent().parent().remove();
      console.log(guestObj);
    })
}

/**
 * This event listner removes user to the guest list obj and HTML.
 * @param {*} id Guest ID 
 * @param {*} name Guest Name
 */
function uninviteFreindListner(id) {
  document.getElementById(id)
    .addEventListener('click', function () {
      delete guestObj[id];
      $("#" + id).parent().parent().remove();
    })
}

//Meathods to run on run
renderGuest()