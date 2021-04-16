/**
 * JavaScript for account.html
 * @author Ravinder Shokar
 * @version 1.0 
 * 
 */

/**
 * This function updates the user name in the account page html.
 * @author Ravinder Shokar
 * @version 1.0 
 */
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    user_name = $("#user_name")
    user_name.text(CURRENT_USER.displayName)

  } else {
    console.log("User Not Logged In")
  }
});

/**
 * This runs everytime the page is loaded
 * @author Ravinder Shokar
 * @version 1.0  
 */
$(document).ready(function () {
  user = auth.currentUser


  /**
   * This on Click event listner updates users email and name in the DB
   * @author Ravinder Shokar 
   * @version 1.0
   */
  $("#submit_edit_user").click(function () {
    let email = $("#inputEmail").val()
    let name = $("#inputName").val()

    user.updateProfile({
      displayName: name
    }).then(function () {
      user.updateEmail(email).then(function () {
        console.log("Updated user email and name")
        location.reload()
      }).catch(function (error) {
        console.log("Failure to update user email")
      });
    }).catch(function (error) {
      console.log("Failure to update user info")
    });

  })


})

/**
 * This function slides the account update form up and down.
 * @author Ravinder Shokar
 * @versoin 1.0
 */
function expandAccount() {
  user = auth.currentUser
  div = $("#my_account")
  if ($(div).hasClass("active")) {

    $(div).removeClass("active")
    $("#my_account_form").slideUp(1000)


  } else {
    console.log(user);
    $("#inputEmail").val(user.email)
    $("#inputName").val(user.displayName)
    $(div).addClass("active")
    $("#my_account_form").slideDown(1000)
  }

}



/**
 * This meathod queries the DB for current users freinds and then displays it to HTML.
 * @author Ravinder Shokar 
 * @version 1.0 
 */
function renderFreinds() {
  var freindsDoc = db.collection('users').doc(auth.currentUser.uid).collection('freinds');
  freindsDoc.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      let user = doc.data();
      console.log(doc.id);
      html = "<tr><td><span class='freind_name'>" + user.name
        + "</span></td><td><button id='" + doc.id + "' class='action_button remove'>Remove</button></td></tr>"
      $('#freinds_list').append(html);
      removeFreindListner(doc.id)
    });
  });
}

/**
 * This function updates HTML when user inpnut on search bar.
 * @author Ravinder Shokar 
 * @version 1.0 
 */
$('#freinds_search_bar').on('input', function () {
  var query = $('#freinds_search_bar').val();

  //Empties HTML every keystroke.
  $('#freinds_list').empty();
  $('#user_list').empty();

  //If the search bar is empty we render freinds to html. 
  if (query == "") {
    renderFreinds();
    return;
  }

  //Get users that match search query and display them to HTML.
  db.collection('users').where('name', '>=', query)
    .where('name', '<', query + 'z')
    .get()
    .then((querySnapshot) => {
      $('#user_list').empty();
      querySnapshot.forEach((doc) => {
        inUser = doc.data();
        let inHtml = "<tr> <td><span class='user_name'>" + inUser.name + "</span></td><td><button id='" + doc.id + "' class='action_button add'>Add</button></td></tr>"
        $('#user_list').append(inHtml);
        addFreindListner(doc.id, inUser.name);

      })
    })
    .catch((error) => {
      console.log("Error getting documents: ".error);
    });


});

/**
 * The click functions bellow control which tab is showing on account.html.
 * This is done by changing the CSS display setting and the color of the tabs.
 * @author Ravinder Shokar 
 * @version 1.0   
 */
function cleanPages() {

  $('#freinds_list').empty();

  $('.tab').css({
    'background-color': '#EE964b',
    'color': 'white'
  })

  $('.page').css({
    'display': 'none'
  })
}

$("#freinds_tab").click(function () {
  cleanPages();
  renderFreinds();

  $('#freinds').css({
    'display': 'block'
  })

  $(this).css({
    'background-color': 'white',
    'color': 'black'
  })
})

$("#exposures_tab").click(function () {
  cleanPages();

  $('#expsorues').css({
    'display': 'block'
  })

  $(this).css({
    'background-color': 'white',
    'color': 'black'
  })
})

$("#account_tab").click(function () {
  cleanPages();

  $('#user_setting').css({
    'display': 'block'
  })

  $(this).css({
    'background-color': 'white',
    'color': 'black'
  })
})

/**
 * Listener for .action_button. 
 * This listner is responsible for adding users to the currrent users 
 * freinds list
 * @author Ravinder Shokar 
 * @verion 1.0
 * @param id user ID 
 * @oaram name User name. 
 */
function addFreindListner(id, name) {
  document.getElementById(id)
    .addEventListener('click', function () {
      obj = {
        "name": name
      }
      console.log(name);
      db.collection('users')
        .doc(auth.currentUser.uid)
        .collection('freinds')
        .doc(id)
        .set(obj)
        .then(function () {
          console.log("Added freind DB");
          $("#" + id).parent().parent().remove();
        })

    })
}
/**
 * This listner is responsible for removing freinds from currrent users
 * freinds list
 * @author Ravinder Shokar 
 * @version 1.0
 * @param id freind ID. 
 */

function removeFreindListner(id) {
  document.getElementById(id)
    .addEventListener('click', function () {
      db.collection('users')
        .doc(auth.currentUser.uid)
        .collection('freinds')
        .doc(id)
        .delete()
        .then(function () {
          console.log("Deleted freind DB");
          $("#" + id).parent().parent().remove();
        })


    })
}

//This function is to redirect userers to event_histroy.html
$("#event_history").click(function () {
  window.location.replace("http://127.0.0.1:5500/event_history.html")
})