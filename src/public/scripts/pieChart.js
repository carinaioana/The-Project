import logout from "./app.js";
import {hideErrorModal, showErrorModal} from "./errorHandler.js";

document.addEventListener("DOMContentLoaded", function () {
    let selectedEducation;
    let selectedTime;
    let selectedCounty;
    let apiUrl;
    let selectedInputsCounter = 0;
    let check;
    let avgStudies = 5000;
    const token = localStorage.getItem("token");
    const CHART_COLORS = {
        red: "rgb(255, 99, 132)",
        orange: "rgb(255, 159, 64)",
        yellow: "rgb(255, 205, 86)",
        green: "rgb(75, 192, 192)",
        blue: "rgb(54, 162, 235)",
        purple: "rgb(153, 102, 255)",
        gray: "rgb(201, 203, 207)",
        // Add more color labels and values as needed
    };
    const initialData = {
        labels: ["Total"],
        datasets: [
            {
                data: [avgStudies],
                backgroundColor: ["blue"],
            },
        ],
    };
    const column = document.querySelectorAll('input[name="education"]');
    for (let i = 0; i < column.length; i++) {
        column[i].addEventListener("change", handleCheckbox);
    }
    const month = document.querySelectorAll('input[name="months"]');
    for (let i = 0; i < month.length; i++) {
        month[i].addEventListener("change", handleCheckbox);
    }

    const checkboxes = document.querySelectorAll('input[name="county"]');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", handleCheckbox);
    }

    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", handleCheckbox);
    }

    // Import the necessary functions and objects

    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) {
        logout();
    }

    // Get the canvas element and its 2D context
    const canvas = document.getElementById("myChart");
    const ctx = canvas.getContext("2d");

    // Utility function to generate a random color
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

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
            deleteFromChart(checkboxValue);
            selectedInputsCounter--;
        }
        fetchData();
    }

    function updateChart(data) {
        const datasetBackgroundColor = getRandomColor();
        // Create the updated chart data object
        // Update the chart with the new data
        console.log(selectedEducation[selectedEducation.length - 1]);
        console.log(data[0][selectedEducation[selectedEducation.length - 1]]);

        chart.data.labels.push(
            `${selectedEducation[selectedEducation.length - 1]}`
        );
        chart.data.datasets[0].data.push(
            data[0][selectedEducation[selectedEducation.length - 1]]
        );
        chart.data.datasets[0].backgroundColor.push(datasetBackgroundColor);
        chart.update();
    }

    function deleteFromChart(education) {

        const labelIndex = chart.data.labels.indexOf(education);

        if (labelIndex !== -1) {
            chart.data.labels.splice(labelIndex, 1);
            chart.data.datasets.forEach((dataset) => {
                dataset.data.splice(labelIndex, 1);
            });

            chart.update();
        }
    }

    function fetchData() {
        selectedEducation = Array.from(column)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        selectedTime = Array.from(month)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        selectedCounty = Array.from(checkboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
        if (selectedInputsCounter < 3) {
            return; // Wait until all three inputs are selected and county is defined
        }

        apiUrl = `http://localhost:3000/api/education?month=${selectedTime}&county=${selectedCounty}&column=${selectedEducation}`;

        fetch(apiUrl, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Request failed");
                }
                return response.json();

            })
            .then((data) => {
                console.log(data);
                updateChart(data);
            })
            .catch((error) => {
                showErrorModal("You must login first!");
                setTimeout(hideErrorModal, 3000);
                console.log("Error:", error.message);
            });

    }

    function fetchCsvData() {

        let csvUrl = `http://localhost:3000/api/education/${selectedTime}`

        fetch(csvUrl, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Request failed");
                }
                return response.text(); // Use response.text() to retrieve the response body as text
            })
            .then((csvData) => {
                let filename1 = 'data.csv';
                exportCSV(filename1, csvData);
            })
            .catch((error) => {
                showErrorModal("You must login first!");
                setTimeout(hideErrorModal, 3000);
                console.log("Error:", error.message);
            });
    }


    const csvButton = document.getElementById('csv')
    csvButton.addEventListener("click", () => {
        fetchCsvData()
    })


    function exportCSV(filename, csvData) {
        const element = document.createElement("a");
        element.setAttribute("href", `data:text/csv;charset=utf-8,${csvData}`);
        element.setAttribute("download", filename);

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

    }


    const chart = new Chart(ctx, {
        type: "pie",
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
                    text: "Education Pie Chart",
                },
            },
        },
    });

});
