
/**
 * This script builds our HTML blocks found on discover.html 
 * @author Ravinder Shokar
 * @version 1.0
 */
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


  /**
   * This function builds our HTML and return blocks found on discover.HTML 
   * @author Ravinder Shokar
   * @version 1.0
   * @param inData A list containing event name, location, rating, Categories, ID, and image location 
   * @returns HTML which will contain all inputed data. 
   */
  function createDiscoverEvent(inData) {
    let container = createBox(inData[4])
    container.append(createImages(inData[5]))
    container.append(createTitle(inData[0]))
    container.append(createAddress(inData[1]))
    container.append(createRating(inData[2]))
    container.append(createCategries(inData[3]))
    return container;
  }

  /**
   * Adds listner that reidrects user to discover_details.html after clicking on a 
   * block. 
   * @author Ravinder Shokar
   * @version 1.0
   * @param id Discover event location ID 
   */
  function discoverDetailsListner(id) {
    console.log(document.getElementById(id));
    document.getElementById(id)
      .addEventListener('click', function () {
        myUrl = "http://127.0.0.1:5500/discover_details.html?id=" + id;
        window.location.replace(myUrl);
      })
  }

  /**
   * Creates the outer div in which rest of block will fit in. 
   * @author Ravinder Shokar
   * @version 1.0
   * @param {*} id Discover event ID
   * @returns div with id set to Event ID 
   */
  function createBox(id) {
    let box = $("<div id='" + id + "'></div>");
    box.addClass("box");
    return box
  }

  /**
   * Creates div containing title if Event location.  
   * @author Ravinder Shokar
   * @version 1.0
   * @param {*} inName Event name 
   * @returns div containing event location name. 
   */
  function createTitle(inName) {
    let title = $("<div>" + inName + "</div>");
    title.addClass("event_name");
    return title
  }

  /**
    * Creates div containing address of Event location. 
    * @author Ravinder Shokar
    * @version 1.0
    * @param {*} inName Event name 
    * @returns div containing event location adress. 
    */
  function createAddress(inAddress) {
    let address = $("<div>" + inAddress + "</div>");
    address.addClass("event_address");
    return address
  }


  /**
    * Creates div containing rating of Event location. 
    * @author Ravinder Shokar
    * @version 1.0
    * @param {*} inRating out of 5 rating of event location.
    * @returns div containing event location rating. 
    */
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

  /**
   * Creates and  returns stars found in rating. 
   * @param {*} inColor color of the star
   * @returns div shaped as a start. 
   */
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

  /**
   * Creates the HTML to store event location categories
   * @param {*} inCategories A list of categories associated with event
   * @returns span containing event location categories. 
   */
  function createCategries(inCategories) {
    let categories = inCategories[0]
    for (w = 1; w < inCategories.length; w++) {
      categories += ", " + inCategories[w]
    }
    categories = $("<span>" + categories + "</span>");
    categories.addClass("categories")
    return categories

  }

  /**
   * Creates the HTML to display event location images
   * @param {*} inImage Image associated with 
   * @returns span containing event location categories. 
   */
  function createImages(inImage) {
    let image_container = $("<div><div>")
    image_container.addClass("image_container");
    let image = $("<img class='event_image' src='images/" + inImage + "'>");

    image_container.append(image)
    return image_container;
  }
});


