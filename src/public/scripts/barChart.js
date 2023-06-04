import logout from "./app.js";

document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("token");
    let selectedEnvironment; // Stores the selected environment values
    let selectedTime; // Stores the selected time values
    let apiUrl; // Stores the API URL for fetching data
    let selectedInputsCounter = 0; // Counts the number of selected inputs
    let check;
    let chart; // Stores the chart instance
    const token = localStorage.getItem("token");

    if (isLoggedIn) {
        logout();
    }

    const CHART_COLORS = {
        red: "rgb(255, 99, 132)",
        orange: "rgb(255, 159, 64)",
        yellow: "rgb(255, 205, 86)",
        green: "rgb(75, 192, 192)",
        blue: "rgb(54, 162, 235)",
        purple: "rgb(153, 102, 255)",
        // Add more color labels and values as needed
    };

    // Function to transform county name to proper format
    function transformCountyName(county) {
        // Convert the string to lowercase
        const lowercaseCounty = county.toLowerCase();

        // Capitalize the first letter
        const transformedCounty =
            lowercaseCounty.charAt(0).toUpperCase() + lowercaseCounty.slice(1);

        return transformedCounty;
    }

    // Function to set the initial chart
    async function setInitialChart() {
        let labels = []; // Stores the chart labels
        let initialDatasetArrayUrban = []; // Stores initial dataset values for urban
        let initialDatasetArrayRural = []; // Stores initial dataset values for rural

        // Fetch data from the API
        await fetch(
            "http://localhost:3000/api/environment?month=3&county=total_urban, total_rural",
            {
                headers: {Authorization: `Bearer ${token}`},
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Request failed");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                // Extract the necessary data for the chart
                for (let i = 1; i < data.length - 1; i++) {
                    if (data[i].county === "Total TARA") {
                        continue; // Skip the column with county "total TARA"
                    }
                    let formattedCounty = transformCountyName(data[i].county);
                    labels.push(formattedCounty);
                    initialDatasetArrayUrban.push(data[i].total_urban);
                    initialDatasetArrayRural.push(data[i].total_rural);
                }
            })
            .catch((error) => {
                console.log("Error:", error.message);
            });

        console.log(initialDatasetArrayUrban);

        // Prepare the initial chart data
        const initialData = {
            labels: labels,
            datasets: [
                {
                    axis: "y",
                    label: "Urban",
                    data: initialDatasetArrayUrban,
                    borderColor: CHART_COLORS.red,
                    backgroundColor: CHART_COLORS.orange,
                },
                {
                    label: "Rural",
                    data: initialDatasetArrayRural,
                    borderColor: CHART_COLORS.blue,
                    backgroundColor: CHART_COLORS.purple,
                },
            ],
        };

        const CHART = document.getElementById("barChart");
        chart = new Chart(CHART, {
            type: "bar",
            data: initialData,
            options: {
                responsive: true,
                aspectRatio: 2,
                plugins: {

                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Environment bar chart",
                    },
                },
            },
        });
    }

    // Call the function to set the initial chart
    setInitialChart();

    // Event listeners for environment checkboxes
    const column = document.querySelectorAll('input[name="environment"]');
    for (let i = 0; i < column.length; i++) {
        column[i].addEventListener("change", handleCheckbox);
    }

    // Event listeners for month checkboxes
    const month = document.querySelectorAll('input[name="months"]');
    for (let i = 0; i < month.length; i++) {
        month[i].addEventListener("change", handleCheckbox);
    }

    // Function to handle checkbox changes
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
        }

        fetchData();
    }

    // Function to fetch data from the API
    function fetchData() {
        // Get the selected environment values
        selectedEnvironment = Array.from(column)
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
        apiUrl = `http://localhost:3000/api/environment?month=${selectedTime}&county=${selectedEnvironment}`;
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
                updateChart(data, selectedEnvironment);
            })
            .catch((error) => {
                console.log("Error:", error.message);
            });
    }

    // Lookup table for label names
    const labelLookupTable = {
        total_urban: "Urban",
        total_rural: "Rural",
        male_urban: "Male Urban",
        male_rural: "Male Rural",
        female_rural: "Female Rural",
        female_urban: "Female Urban",
    };

    // Function to update the chart with new data
    function updateChart(data, selectedEnvironment) {
        let dataArray1 = []; // Stores data for the first environment
        let dataArray2 = []; // Stores data for the second environment
        let dataArray3 = []; // Stores data for the third environment

        // Extract the necessary data for the chart
        for (let i = 1; i < data.length - 1; i++) {
            if (data[i].county === "total TARA") {
                continue; // Skip the column with county "total TARA"
            }
            dataArray1.push(data[i][selectedEnvironment[0]]);
            if (selectedEnvironment[1]) {
                dataArray2.push(data[i][selectedEnvironment[1]]);
            }
            if (selectedEnvironment[2]) {
                dataArray3.push(data[i][selectedEnvironment[2]]);
            }
        }

        console.log(dataArray1);
        console.log(dataArray2);
        console.log(dataArray3);

        // Update the chart datasets based on selected environments
        if (dataArray1 !== []) {
            const newDataset = {
                label: labelLookupTable[selectedEnvironment[0]],
                backgroundColor: CHART_COLORS.red,
                borderColor: CHART_COLORS.yellow,
                borderWidth: 1,
                data: dataArray1,
            };
            chart.data.datasets.splice(0);
            chart.data.datasets.push(newDataset);
        }
        if (dataArray2 !== []) {
            const newDataset = {
                label: labelLookupTable[selectedEnvironment[1]],
                backgroundColor: CHART_COLORS.orange,
                borderColor: CHART_COLORS.blue,
                borderWidth: 1,
                data: dataArray2,
            };
            chart.data.datasets.splice(1);
            chart.data.datasets.push(newDataset);
        }
        if (dataArray3 !== []) {
            const newDataset = {
                label: labelLookupTable[selectedEnvironment[2]],
                backgroundColor: CHART_COLORS.purple,
                borderColor: CHART_COLORS.red,
                borderWidth: 1,
                data: dataArray3,
            };
            chart.data.datasets.splice(2);
            chart.data.datasets.push(newDataset);
        }

        chart.update();
    }

    document.getElementById("pdf").addEventListener("click", downloadPDF);

    function downloadPDF() {
        console.log("Button pdf clicked");

        const canvas = document.getElementById('barChart');
        //create image
        const canvasImage = canvas.toDataURL('image/jpeg', 1.0);

        //image must go to PDF
        let pdf = new jsPDF('landscape');
        pdf.setFontSize(20);
        pdf.setFillColor(255, 255, 255);
        pdf.addImage(canvasImage, 'JPEG', 15, 15, 280, 150);
        pdf.save('barChart.pdf');

    }

});
