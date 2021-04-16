/**
 * 
 * @author Brendan Lin
 */
//creates an event to display on the html
function createEvent(input) {
  let container = createBox(input[3]);
  container.append(createImages());
  container.append(createTitle(input[0]));
  container.append(createAddress(input[1]));
  container.append(createDate(input[2]));
  return container;
}

/**
 * 
 * @author Brendan Lin
 */
//Builds the date
function createDate(inputDate) {
  let date = $("<div>" + inputDate + "</div>");
  date.addClass("event_date");
  return date;
}

/**
 * 
 * @author Brendan Lin
 */
//Creates the testboxes
function createBox(event) {
  let box = $("<div id='" + event + "'></div>");
  box.addClass("box");
  return box
}

/**
 * 
 * @author Brendan Lin
 */
//Builds the title
function createTitle(inName) {
  let title = $("<div>" + inName + "</div>");
  title.addClass("event_name");
  return title
}

/**
 * 
 * @author Brendan Lin
 */
//Creates the address of event
function createAddress(inAddress) {
  let address = $("<div>" + inAddress + "</div>");
  address.addClass("event_address");
  return address
}

/**
 * 
 * @author Ravinder Shokar
 */
//Adds a slider
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

/**
 * 
 * @author Brendan Lin
 */
//Creates the images to display
function createImages() {
  let image_container = $("<div><div>")
  image_container.addClass("image_container");
  let image = $("<img src='images/park1.png'>");

  image_container.append(image)
  return image_container;
}


