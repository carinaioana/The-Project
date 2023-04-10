function changeColor() {
    const mySVG = document.getElementById("myMap");
    const myPath = mySVG.contentDocument.getElementById("ROU133");
    myPath.setAttribute("fill", "green");

}// Define the URL of the JSON file
const url = "../static/all-data.json";
function idToColor(id) {
    // Ensure id is in the range [1, 41]
    id = Math.max(1, Math.min(41, id));
    // Calculate the color value
    var greenValue = 255 - Math.round((id - 1) * 255 / 40);
    var redValue = Math.round((id - 1) * 255 / 40);
    // Return the RGB color value as a string
    return "rgb(" + redValue + ", " + greenValue + ", 0)";
  }
  
// Fetch the JSON data
function fetchData(filterType) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      data.sort(function(a, b) {
        return b[filterType] - a[filterType];
      });
      for (i = 0; i < data.length; i++) {
        const mySVG = document.getElementById("myMap");
        const myPath = mySVG.contentDocument.getElementById(data[i].id);
        myPath.setAttribute("fill", idToColor(i));
      }
    })
    .catch(error => {
      console.error("There was a problem fetching the data:", error);
    });
}
function filter(filterType) {
  console.log(filterType);
  fetchData(filterType);
}

filter("rate-of-unemployment");