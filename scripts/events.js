
//.doc("Enter document hash to access that user's event info")
$(document).ready(function () {
    let a = $("<a href='#' class='list-group-item list-group-item-action'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
        "<h5 class='mb-1' id='location'></h5>" +
        "<small class='text-muted'>A few seconds ago</small>" +
        "</div>" +
        "<small class='text-muted' id='date'></small>" +
        "</a>");

    $("#eventlist").append(a);

    db.collection("Event").where("Location", "==", "!@)% 56ave")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log("hello");
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
})