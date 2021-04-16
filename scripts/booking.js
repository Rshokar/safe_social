
/**
 * @author Brendan Lin
 */
var guestObj = {}

var sendObj = JSON.parse(localStorage.getItem('formdata'));

$(document).ready(function () {
  console.log(sendObj.address);
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

//This meathod gets event guest from guestObj and displays them to HTML
function renderGuest() {
  for (var guest in guestObj) {
    html = "<tr><td><span class='freind_name'>" + guestObj[guest].name
      + "</span></td><td><button id='" + guest + "' class='action_button remove'>Remove</button></td></tr>"
    $('#guest_list').append(html);
    uninviteFreindListner(guest);
  }
}

/**
 * @author Ravinder Shokar
 */
//This meathod gets user freinds from DB and displays them to HTML
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
 * This function is targeted at back button on booking.html
 * It also empties the freinds list html and displays the guest html.  
 * 
 */
$("#back").click(function () {
  renderGuest()
  $("#freinds_list table").empty()
  $('#freinds_list').css({
    'display': 'none'
  })
})

//This function is targeted at add freinds button on booking.html
//It also empties the html guest list and displays freinds list. 
$("#add_freinds").click(function () {
  renderFreinds()
  $("#guest_list").empty()
  $('#freinds_list').css({
    'display': 'block'
  })
})

//This event listner add the user to the guest list obj and html.
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

//This event listner removes the user from the guest list obj and html.
function uninviteFreindListner(id) {
  document.getElementById(id)
    .addEventListener('click', function () {
      delete guestObj[id];
      $("#" + id).parent().parent().remove();
    })
}

//Meathods to run on run
renderGuest()