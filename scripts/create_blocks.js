
$(document).ready(function () {

  let eventLocation = [
    ["Vancouver Creek Park", " 4600 Cambie St, Vancouver, BC V5Z 2Z1", 3, ["Hiking", "Tennis", "Out Door Gym"], "Xw4YyfzvrIkLFjE61G7m", "park1.png"
    ],
    ["Brandywine Falls Provincial Park", "Whistler, BC V0N 0A0", 2, ["Skating", "Fishing", "Snow Shoeing"], "ba4Rs6bIr8tDIfWDPfsV", "park2.png"
    ],
    ["Burnaby Mountain Conservation Area", "800 Burnaby Mountain Pkwy, Burnaby, BC V5A 1G9", 5, ["Hiking", "Bird Watching", "Running"], "7g9YEpk5SCUwqNdIbbzY", "park3.png"
    ],
    ["Ruth Johnson Park", "14600 North Bluff Rd, White Rock, BC V4B 2V1", 4, ["Swimming", "Dog Park"], "8cXzaOdTV7hWGdP5jm5o", "park4.png"],
    ["Penzer Action Park", "4748 198c St, Langley City, BC V3A 8G2", 5, ["Cat Park", "Lots of Mice", "NO DOGS"], "mmslXIeU0Fh8fnEqlsgG", "park5.jpg"
    ],
  ]



  for (i = 0; i < eventLocation.length; i++) {
    $("#content_section").append(createDiscoverEvent(eventLocation[i]));
    console.log(eventLocation[i][4]);
    discoverDetailsListner(eventLocation[i][4]);
  }

  function createDiscoverEvent(inData) {
    let container = createBox(inData[4])
    container.append(createImages(inData[5]))
    container.append(createTitle(inData[0]))
    container.append(createAddress(inData[1]))
    container.append(createRating(inData[2]))
    container.append(createCategries(inData[3]))
    return container;
  }

  //Sends user to the disover details page - Brendan
  function discoverDetailsListner(id) {
    console.log(document.getElementById(id));
    document.getElementById(id)
      .addEventListener('click', function () {
        myUrl = "http://127.0.0.1:5500/discover_details.html?id=" + id;
        window.location.replace(myUrl);
      })
  }

  //Creates the textboxes - Brendan
  function createBox(id) {
    let box = $("<div id='" + id + "'></div>");
    box.addClass("box");
    return box
  }

  //Creates the title of event - Brendan
  function createTitle(inName) {
    let title = $("<div>" + inName + "</div>");
    title.addClass("event_name");
    return title
  }

  //Builds the addresses of locations - Brendan
  function createAddress(inAddress) {
    let address = $("<div>" + inAddress + "</div>");
    address.addClass("event_address");
    return address
  }

  //Creates the rating - Brendan
  function createRating(inRating) {
    let positive = inRating
    let negative = 5 - inRating

    let ratingContainer = $("<div></div>");
    ratingContainer.addClass("raiting_container")
    ratingContainer.css({
    })


    for (y = 0; y < positive; y++) {
      ratingContainer.append(createStar("red"))
    };

    for (z = 0; z < negative; z++) {
      ratingContainer.append(createStar("grey"))
    };

    return ratingContainer
  }

  //Creates rating stars
  function createStar(inColor) {
    let star = $("<div></div>");
    star.addClass("stars");
    star.css({
      "display": "inline-block",
      "background-color": inColor,
      "clip-path": "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      "width": "20px",
      "height": "20px",
      "max-width": "25px",
      "float": "left",
    })

    return star;
  }

  function createCategries(inCategories) {
    let categories = inCategories[0]
    for (w = 1; w < inCategories.length; w++) {
      categories += ", " + inCategories[w]
    }
    categories = $("<span>" + categories + "</span>");
    categories.addClass("categories")
    return categories

  }

  function createSlider() {
    let slider = $("<div>=</div>");
    slider.addClass("slider");
    slider.css({
      "height": "20px",
      "width": "100%",
      "color": "white",
      "line-height": "15px"
    })

    return slider
  }

  function createImages(inImage) {
    let image_container = $("<div><div>")
    image_container.addClass("image_container");
    let image = $("<img class='event_image' src='images/" + inImage + "'>");

    image_container.append(image)
    return image_container;
  }
});


