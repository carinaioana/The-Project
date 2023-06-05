import logout from "../scripts/app.js";

// Check if the user is logged in
const isLoggedIn = localStorage.getItem("token");

// If logged in, perform logout
if (isLoggedIn) {
    logout();
}

// Get the map element
const map = document.getElementById("map");

// Get the token from localStorage
const token = localStorage.getItem("token");

// Create the tooltip element
const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');

// Function to initialize the map
function initializeMap() {
    // Wait for the map to load
    map.addEventListener("load", async function () {
        // Get the SVG document from the map
        const svgDocument = map.contentDocument;

        // Select the SVG element
        const svgElement = svgDocument.querySelector('svg');

        // Select all county paths from the SVG
        const counties = svgElement.querySelectorAll('path');

        // Get the parent container of the map
        const mapContainer = map.parentElement;

        mapContainer.appendChild(tooltip);

        // Show tooltip with county information
        function showTooltip(event, name, numarTotalSomeri) {

            tooltip.textContent = `Name: ${name};\n Numar someri: ${numarTotalSomeri}`;

            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;

            const left = event.clientX + 10;
            const top = event.clientY + 10;

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Adjust tooltip position to stay within the window bounds
            tooltip.style.left = `${Math.min(left, windowWidth - tooltipWidth)}px`;
            tooltip.style.top = `${Math.min(top, windowHeight - tooltipHeight)}px`;

            tooltip.style.display = 'block';
        }

        // Hide tooltip
        function hideTooltip() {
            tooltip.style.display = 'none';
        }

        // Get color based on value and range
        function getColor(value, domain, range) {
            const colorScale = d3.scaleLinear().domain(domain).range(range);
            return colorScale(value);
        }

        // Calculate minimum and maximum values from data
        function calculateMinMax(min, max, data, selectedColumn) {
            for (let i = 0; i < data.length - 1; i++) {
                const rate = parseFloat(data[i][selectedColumn]);

                if (rate < min) {
                    min = rate;
                }

                if (rate > max) {
                    max = rate;
                }
            }
            return [min, max];
        }

        const column = document.querySelectorAll('input[name="gender"]');
        for (let i = 0; i < column.length; i++) {
            column[i].addEventListener("change", handleCheckbox);
        }

        // Event listeners for month checkboxes
        const month = document.querySelectorAll('input[name="months"]');
        for (let i = 0; i < month.length; i++) {
            month[i].addEventListener("change", handleCheckbox);
        }
        let check

        function handleCheckbox() {
            let checkboxValue = event.target.value;
            let isChecked = event.target;

            if (isChecked.checked) {
                check = 1;
                console.log(`Button ${checkboxValue} checked`);
                selectedInputsCounter++;
            } else {
                check = 0;
                console.log(`Button ${checkboxValue} unchecked`);
                selectedInputsCounter--;
                selectedColumn = [];
                selectedTime = [];
                updateMap([], []);
            }

            fetchData();
        }

        let selectedColumn; // Stores the selected environment values
        let selectedTime; // Stores the selected time values
        let apiUrl; // Stores the API URL for fetching data
        let selectedInputsCounter = 0; // Counts the number of selected inputs

        function fetchData() {
            // Get the selected environment values
            selectedColumn = Array.from(column)
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value);

            // Get the selected time values
            selectedTime = Array.from(month)
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value);

            // Check if the required number of inputs are selected
            if (selectedInputsCounter < 2 || selectedInputsCounter > 4) {
                return; // Wait until all inputs are selected
            }

            // Construct the API URL
            apiUrl = `http://localhost:3000/api/map?month=${selectedTime}&filter=${selectedColumn}`;
            console.log(apiUrl);

            // Fetch data from the constructed API URL
            fetch(apiUrl, {headers: {Authorization: `Bearer ${token}`}})
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Request failed");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    updateMap(data, selectedColumn);
                })
                .catch((error) => {
                    console.log("Error:", error.message);
                });
        }

        // Function to update the map with new data
        async function updateMap(data, selectedColumn) {
            try {
                for (let i = 1; i < data.length - 1; i++) {
                    let minTotalUnemployed = data[i][selectedColumn];
                    let maxTotalUnemployed = data[i][selectedColumn];

                    [minTotalUnemployed, maxTotalUnemployed] = calculateMinMax(minTotalUnemployed, maxTotalUnemployed, data, selectedColumn);

                    // Iterate over counties and apply color and tooltip events
                    for (let i = 0; i < counties.length; i++) {

                        const county = counties[i];
                        const name = county.getAttribute('name');
                        const countyData = data.find(item => item.county.toLowerCase() === name.toLowerCase());

                        if (countyData) {
                            const column = countyData[selectedColumn];
                            county.setAttribute('numar-someri', column);
                            county.style.fill = getColor(column, [minTotalUnemployed, maxTotalUnemployed], ['#00ff04', '#dc0606']);

                            county.addEventListener('mouseover', (function (name, column) {
                                return function (event) {
                                    showTooltip(event, name, column);
                                };
                            })(name, column));

                            county.addEventListener('mousemove', function (event) {
                                tooltip.style.left = `${event.clientX + 10}px`;
                                tooltip.style.top = `${event.clientY + 10}px`;
                            });

                            county.addEventListener('mouseout', hideTooltip);
                        }
                    }
                }
            } catch (error) {
                console.error('Error updating the map:', error);
            }

        }
    });
}

const downloadButton = document.getElementById("svg");

// Add event listener for the download button
downloadButton.addEventListener("click", downloadSVG);

// Function to download the SVG
function downloadSVG() {
    // Get the SVG content
    const svgContent = map.contentDocument.querySelector("svg").outerHTML;

    // Create a blob from the SVG content
    //==Binary Large Object
    const svgBlob = new Blob([svgContent], {type: "image/svg+xml"});

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(svgBlob);
    downloadLink.download = "map.svg";

    // Append the download link to the document body
    document.body.appendChild(downloadLink);

    // Simulate a click on the download link
    downloadLink.click();

    // Remove the download link from the document body
    document.body.removeChild(downloadLink);
}

// Call the initializeMap function to initialize the map
initializeMap();

