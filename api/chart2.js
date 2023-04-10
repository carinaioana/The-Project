// Define the URL of the JSON file
const url = "../static/all-data.json";

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
      // Loop through the data and create HTML elements to display it
      const outputDiv = document.getElementById("output");
      outputDiv.className = "chart2-container";
      outputDiv.innerHTML = "";
      //sort the data by filterType

      data.sort(function(a, b) {
        return b[filterType] - a[filterType];
      });
      console.log(data[0]);
      maxValue = data[0][filterType];
      for (i = 0; i < data.length; i++) {
        const mainDiv = document.createElement("div");
        mainDiv.className = "chart2";

        //nume judet
        const countyNameDiv = document.createElement("div");
        countyNameDiv.className = "chart2-title";

        const countyName = document.createElement("h3");
        countyName.textContent = data[i].county;

        countyNameDiv.appendChild(countyName);
        //end nume judet

        //value
        const valueDiv = document.createElement("div");
        valueDiv.className = "chart2-value";

        const value = document.createElement("p");
        value.textContent = data[i][filterType];

        valueDiv.appendChild(value);
        //end value


        //bar
        const barDiv = document.createElement("div");
        barDiv.className = "chart2-level";

        const bar = document.createElement("div");
        bar.className = "chart2-level-color";
        bar.style.width = data[i][filterType] * 100 / maxValue + "%";

        barDiv.appendChild(bar);
        //end bar

        mainDiv.appendChild(countyNameDiv);
        mainDiv.appendChild(valueDiv);
        mainDiv.appendChild(barDiv);
        outputDiv.appendChild(mainDiv);
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