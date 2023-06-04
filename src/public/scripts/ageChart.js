import logout from "./app.js";

document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("token");
    let selectedCounty; // Stores the selected environment values
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
    };

    // Function to set the initial chart
    async function setInitialChart() {
        const labels = ['under 25', '25 to 29', '30 to 39', '40 to 49', '50 to 55', 'over 55']; // Stores the chart labels
        let initialDatasetArray = []; // Stores initial dataset values for urban

        // Fetch data from the API
        await fetch(
            "http://localhost:3000/api/age?month=3&county=TOTAL",
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
                console.log(data[0]);
                // Extract the necessary data for the chart

                initialDatasetArray.push({index: "under 25", value: data[0].under_25});
                initialDatasetArray.push({index: "between 25-29", value: data[0].between_25_29});
                initialDatasetArray.push({index: "between 30-39", value: data[0].between_30_39});
                initialDatasetArray.push({index: "between 40-49", value: data[0].between_40_49});
                initialDatasetArray.push({index: "between 50-55", value: data[0].between_50_55});
                initialDatasetArray.push({index: "over 55", value: data[0].over_55});

                console.log(initialDatasetArray)

            })
            .catch((error) => {
                console.log("Error:", error.message);
            });
        console.log(initialDatasetArray)

        // Prepare the initial chart data
        const initialData = {
            labels: labels,
            datasets: [
                {
                    label: 'Total last 3 months',
                    data: initialDatasetArray.map(entry => entry.value),
                    borderColor: CHART_COLORS.red,
                    backgroundColor: CHART_COLORS.orange,
                },

            ],
        };
        const CHART = document.getElementById("ageChart");
        chart = new Chart(CHART, {
            type: 'line',
            data: initialData,
            options: {
                responsive: true,
                aspectRatio: 2,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Age line chart',
                    },
                },
            },
        });
    }

    // Call the function to set the initial chart
    setInitialChart()

    // Event listeners for environment checkboxes
    const checkboxes = document.querySelectorAll('input[name="county"]');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", handleCheckbox);
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
        selectedCounty = Array.from(checkboxes)
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
        apiUrl = `http://localhost:3000/api/age?month=${selectedTime}&county=${selectedCounty}`;
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
                updateChart(data, selectedCounty);
            })
            .catch((error) => {
                console.log("Error:", error.message);
            });
    }

    /* // Lookup table for label names
     const labelLookupTable = {
         total_urban: "Urban",
         total_rural: "Rural",
         male_urban: "Male Urban",
         male_rural: "Male Rural",
         female_rural: "Female Rural",
         female_urban: "Female Urban",
     };
*/

    // Function to update the chart with new data
    function updateChart(data, selectedEnvironment) {
        let dataArray1 = []; // Stores data for the first environment
        let dataArray2 = []; // Stores data for the second environment
        let dataArray3 = []; // Stores data for the third environment
        // Extract the necessary data for the chart
        if (selectedEnvironment[0]) {
            dataArray1.push({index: "under 25", value: data[0].under_25});
            dataArray1.push({index: "between 25-29", value: data[0].between_25_29});
            dataArray1.push({index: "between 30-39", value: data[0].between_30_39});
            dataArray1.push({index: "between 40-49", value: data[0].between_40_49});
            dataArray1.push({index: "between 50-55", value: data[0].between_50_55});
            dataArray1.push({index: "over 55", value: data[0].over_55});
        }
        if (selectedEnvironment[1]) {
            dataArray2.push({index: "under 25", value: data[1].under_25});
            dataArray2.push({index: "between 25-29", value: data[1].between_25_29});
            dataArray2.push({index: "between 30-39", value: data[1].between_30_39});
            dataArray2.push({index: "between 40-49", value: data[1].between_40_49});
            dataArray2.push({index: "between 50-55", value: data[1].between_50_55});
            dataArray2.push({index: "over 55", value: data[1].over_55});
        }
        if (selectedEnvironment[2]) {
            dataArray3.push({index: "under 25", value: data[2].under_25});
            dataArray3.push({index: "between 25-29", value: data[2].between_25_29});
            dataArray3.push({index: "between 30-39", value: data[2].between_30_39});
            dataArray3.push({index: "between 40-49", value: data[2].between_40_49});
            dataArray3.push({index: "between 50-55", value: data[2].between_50_55});
            dataArray3.push({index: "over 55", value: data[2].over_55});
        }

        console.log(dataArray1);
        console.log(dataArray2);
        console.log(dataArray3);

        // Update the chart datasets based on selected environments
        if (dataArray1 !== []) {
            const newDataset = {
                label: selectedCounty[0],
                backgroundColor: CHART_COLORS.red,
                borderColor: CHART_COLORS.yellow,
                borderWidth: 1,
                data: dataArray1.map(entry => entry.value),
            };
            chart.data.datasets.splice(0);
            chart.data.datasets.push(newDataset);
        }
        if (dataArray2 !== []) {
            const newDataset = {
                label: selectedCounty[1],
                backgroundColor: CHART_COLORS.orange,
                borderColor: CHART_COLORS.blue,
                borderWidth: 1,
                data: dataArray2.map(entry => entry.value),
            };
            chart.data.datasets.splice(1);
            chart.data.datasets.push(newDataset);
        }
        if (dataArray3 !== []) {
            const newDataset = {
                label: selectedCounty[2],
                backgroundColor: CHART_COLORS.green,
                borderColor: CHART_COLORS.purple,
                borderWidth: 1,
                data: dataArray3.map(entry => entry.value),
            };
            chart.data.datasets.splice(2);
            chart.data.datasets.push(newDataset);

            chart.update();
        }
    }

    document.getElementById("pdf").addEventListener("click", downloadPDF);

    function downloadPDF() {
        console.log("Button pdf clicked");

        const canvas = document.getElementById('ageChart');
        //create image
        const canvasImage = canvas.toDataURL('image/jpeg', 1.0);

        //image must go to PDF
        let pdf = new jsPDF('landscape');
        pdf.setFontSize(20);
        pdf.setFillColor(255, 255, 255);
        pdf.addImage(canvasImage, 'JPEG', 15, 15, 280, 150);
        pdf.save('ageChart.pdf');

    }
});
