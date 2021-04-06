/*
Author Ravinder Shokar
version 1.0 

JavaScript for account.html
*/

/* This function updates the user name in the account page */
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        user_name = $("#user_name")
        user_name.text(CURRENT_USER.displayName)

    } else {
        console.log("User Not Logged In")
    }
});

/* This function expands and contracts update account form */
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

/* This function updates users email and name in the DB*/
$(document).ready(function () {
    user = auth.currentUser

    /* This function updates users email and name in the DB*/
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

//This meathod gets user freinds from DB and displays them to HTML
function renderFreinds() {
    var freindsDoc = db.collection('users').doc(auth.currentUser.uid).collection('freinds');
    freindsDoc.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            let user = doc.data();
            html = "<tr><td><span class='freind_name'>" + user.name
                + "</span></td><td><button id='" + doc.id + "' class='action_button remove'>Remove</button></td></tr>"
            $('#freinds_list').append(html);
            removeFreindListner(doc.id)
        });
    });
}

/* This function updates HTML when user inpnut on search bar*/
$('#freinds_search_bar').on('input', function () {
    var query = $('#freinds_search_bar').val();

    //Empties HTML every keystroke.
    $('#freinds_list').empty();
    $('#user_list').empty();

    //If the search bar is empty we re render freinds on the screen. 
    if (query == "") {
        renderFreinds();
        return;
    }

    //Santiy check!
    console.log(query);

    //Get users that match search query and display them to HTML.
    db.collection('users').where('name', '>=', query)
        .where('name', '<', query + 'z')
        .get()
        .then((querySnapshot) => {
            $('#user_list').empty();
            querySnapshot.forEach((doc) => {
                inUser = doc.data();
                let inHtml = "<tr> <td><span class='user_name'>" + inUser.name + "</span></td><td><button id='" + doc.id + "' class='action_button add'>Add</button></td></tr>"

                console.log(doc.id, " => ", doc.data());
                $('#user_list').append(inHtml);
                addFreindListner(doc.id, inUser.name);

            })
        })
        .catch((error) => {
            console.log("Error getting documents: ".error);
        });


});

/** The click functions bellow control which page is showing on account.html
 * They do this by changing the CSS display setting and the color of the tabs.   
 */
function cleanPages() {
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

//Listener for .action_button. 
//This listner is responsible for adding freinds to the currrent users 
//freinds list
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
                    $("#" + id).addClass('remove').removeClass('add');
                })


        })
}
//This listner is responsible for removing freinds from currrent users 
//freinds list
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
                    $("#" + id).addClass('add').removeClass('remove');
                })


        })
}