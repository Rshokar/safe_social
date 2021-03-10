
function createDiscoverEvent(inData) {
  let container = createBox()
  container.append(createTitle(inData[0]))
  container.append(createAddress(inData[1]))
  container.append(createRating(inData[2]))
  container.append(createCategries(inData[3]))
  return container;
}

function createBox() {
  let box = $("<div></div>");
  box.addClass("box");
  box.css({
    "border-left": "2px solid #1324bf"
  })
  return box
}

function createTitle(inName) {
  let title = $("<div>" + inName + "</div>");
  title.addClass("event_name");
  return title
}

function createAddress(inAddress) {
  let address = $("<div>" + inAddress + "</div>");
  address.addClass("event_address");
  return address
}

function createRating(inRating) {
  let positive = inRating
  let negative = 5 - inRating

  let ratingContainer = $("<div></div>");
  ratingContainer.addClass("raiting_container")


  for (y = 0; y < positive; y++) {
    ratingContainer.append(createStar("red"))
  };

  for (z = 0; z < negative; z++) {
    ratingContainer.append(createStar("grey"))
  };

  return ratingContainer
}
function createStar(inColor) {
  let star = $("<div></div>");
  star.addClass("stars");
  star.css({
    "display": "inline-block",
    "background-color": inColor,
    "clip-path": "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    "width": "5vw",
    "height": "25px",
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



$(document).ready(function () {

  let eventLocation = [
    ["Vancouver Creek Park", " 4600 Cambie St, Vancouver, BC V5Z 2Z1", 3, ["Hiking", "Tennis", "Out Door Gym"]],
    ["Brandywine Falls Provincial Park", "Whistler, BC V0N 0A0", 2, ["Skating", "Fishing", "Snow Shoeing"]],
    ["Burnaby Mountain Conservation Area", "800 Burnaby Mountain Pkwy, Burnaby, BC V5A 1G9", 5, ["Hiking", "Bird Watching", "Running"]],
    ["Ruth Johnson Park", "14600 North Bluff Rd, White Rock, BC V4B 2V1", 4, ["Swimming", "Dog Park"]],
    ["Penzer Action Park", "4748 198c St, Langley City, BC V3A 8G2", 5, ["Cat Park", "Lots of Mice", "NO DOGS"]],
  ]

  for (i = 0; i < eventLocation.length; i++) {
    console.log(i)
    $("#content_section").append(createDiscoverEvent(eventLocation[i]))
  }
  $("#content_section").append(createDiscoverEvent())
});
