/*
Author Ravinder Shokar
version 1.0 

JavaScript for account.html
*/

/* This function updates the user name in the account page */
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        user_name = $("#user_name")
        user_name.text(user.displayName)

    } else {
        console.log("User Not Logged In")
    }
});

/* This function expands the account update form */
function expandAccount() {
    user = firebase.auth().currentUser
    div = $("#my_account")
    if ($(div).hasClass("active")) {

        $(div).removeClass("active")
        $("#my_account_form").slideUp(1000)


    } else {
        $("#inputEmail").val(user.email)
        $("#inputName").val(user.displayName)
        $(div).addClass("active")
        $("#my_account_form").slideDown(1000)
    }

}

/* This function updates the current user email and name */
$(document).ready(function () {
    user = firebase.auth().currentUser
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