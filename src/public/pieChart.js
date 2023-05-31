import logout from "./app.js";

document.addEventListener("DOMContentLoaded", function () {
    let selectedEducation;
    let selectedTime;
    let selectedCounty;
    let apiUrl;
    let selectedInputsCounter = 0;
    let check;
    let totalStudies = 2000;
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
                data: [totalStudies],
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
            deleteFromChart(checkboxValue)
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
        /* const checkedEducation = Array.from(column)
             .filter((checkbox) => checkbox.checked)
             .map((checkbox) => checkbox.value);

         chart.data.labels = chart.data.labels.filter((label) =>
             checkedEducation.includes(label)
         );

         chart.data.datasets.forEach((dataset) => {
             dataset.data = dataset.data.filter((_, index) =>
                 checkedEducation.includes(chart.data.labels[index])
             );
         });

         chart.update();*/
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

        fetch(apiUrl)
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
                console.log("Error:", error.message);
            });
    }

    const chart = new Chart(ctx, {
        type: "pie",
        data: initialData,
        options: {
            responsive: true,
            aspectRatio: 2.75,
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

/*
const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');

const column = document.querySelectorAll('input[name="education"]');
for (let i = 0; i < column.length; i++) {
    column[i].addEventListener('change', handleCheckbox);
}
const month = document.querySelectorAll('input[name="months"]');
for (let i = 0; i < month.length; i++) {
    month[i].addEventListener('change', handleCheckbox);
}

const countyList = document.getElementById('county-list');
let checkboxes = countyList.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCountyCheckbox);
});

function handleCountyCheckbox() {
    selectedCounty = Array.from(checkboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

    console.log('Selected county:', selectedCounty);

}

let check;
let data;
const totalStudies = 2743;
let apiUrl;
let selectedInputsCounter = 0;

let selectedEducation;
let selectedTime;
let selectedCounty;


//'No studies', 'Primary school', 'Secondary school', 'High-school', 'Post-secondary education', 'Professional education', 'University education'
function fetchData() {
    // Get the values of all selected checkboxes
    // Create XHR Object
    selectedEducation = Array.from(column)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

    selectedTime = Array.from(month)
        .filter((time) => time.checked)
        .map((time) => time.value);

    if (selectedInputsCounter < 3) {
        return; // Wait until all three inputs are selected and county is defined
    }
    apiUrl = `http://localhost:3000/api/education?month=${selectedTime}&county=${selectedCounty}&column=${selectedEducation}`;

    let xhr = new XMLHttpRequest();
    // Open - type, url/file, async
    xhr.open('GET', apiUrl, true);

    console.log('READYSTATE', xhr.readyState);

    xhr.onload = function () {
        if (this.status === 200) {
            data = JSON.parse(this.responseText);
            console.log(data);
            // Update the chart with the selectedEducation value
            updateChart(data);
        } else if (this.status === 404) {
            document.getElementById('text').innerHTML = 'Not Found';
        }
    };

    xhr.onerror = function () {
        console.log('Request error...');
    };
    // Send request
    xhr.send()
}

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

const initialData = {
    labels: ['Total'],
    datasets: [
        {
            label: 'Education',
            data: [totalStudies],
            backgroundColor: ['blue']
        }
    ]
};

function updateChart(data) {
    const datasetBackgroundColor = getRandomColor();
    // Create the updated chart data object
    // Update the chart with the new data
    chart.data = {
        labels: ['Total', 'Education'],
        datasets: [
            {
                label: 'Education',
                data: [totalStudies, data.value],
                backgroundColor: ['blue', datasetBackgroundColor]
            }
        ]
    };
    chart.update();
}

const chart = new Chart(ctx, {
    type: 'pie',
    data: initialData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Education Pie Chart'
            }
        }
    }
});

function setInitialData() {
    chart.data = initialData;
    chart.update();
}

function init() {
    fetchData();
}

// Initialize the chart with initial data
init();
*/
