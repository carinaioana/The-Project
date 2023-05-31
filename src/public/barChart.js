import logout from "./app.js";

const isLoggedIn = localStorage.getItem("token");
if (isLoggedIn) {
    logout();
}
const CHART = document.getElementById('barChart')
const labels =
    ["ALBA", "ARAD", "ARGES", "BACAU", "BIHOR", "BISTRITA NASAUD", "BOTOSANI", "BRASOV", "BRAILA", "BUZAU",
        "CALARASI", "CARAS-SEVERIN", "CLUJ", "CONSTANTA", "COVASNA", "DAMBOVITA", "DOLJ", "GALATI", "GIURGIU",
        "GORJ", "HARGHITA", "HUNEDOARA", "IALOMITA", "IASI", "ILFOV", "MARAMURES", "MUN. BUC.", "MEHEDINTI",
        "MURES", "NEAMT", "OLT", "PRAHOVA", "SALAJ", "SATU MARE", "SIBIU", "SUCEAVA", "TELEORMAN", "TIMIS",
        "TULCEA", "VALCEA", "VASLUI", "VRANCEA"
    ]

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
const data = {
    labels: labels,
    datasets: [
        {
            axis: 'y',

            label: 'Rural',
            data: [13423, 2423, 32243, 4234, 5423, 642],
            borderColor: CHART_COLORS.red,
            backgroundColor: CHART_COLORS.orange,
        },
        {
            label: 'Urban',
            data: [28149, 4135, 4, 34654, 865, 756],
            borderColor: CHART_COLORS.blue,
            backgroundColor: CHART_COLORS.purple
        }
    ]
};
let barChart = new Chart(CHART, {
    type: 'bar',
    data: data,
    options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
            bar: {
                borderWidth: 2,
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart'
            }
        }
    },
})
/* const actions = [
     {
         name: 'Randomize',
         handler(chart) {
             chart.data.datasets.forEach(dataset => {
                 dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
             });
             chart.update();
         }
     },
     {
         name: 'Add Dataset',
         handler(chart) {
             const data = chart.data;
             const dsColor = Utils.namedColor(chart.data.datasets.length);
             const newDataset = {
                 label: 'Dataset ' + (data.datasets.length + 1),
                 backgroundColor: Utils.transparentize(dsColor, 0.5),
                 borderColor: dsColor,
                 borderWidth: 1,
                 data: Utils.numbers({count: data.labels.length, min: -100, max: 100}),
             };
             chart.data.datasets.push(newDataset);
             chart.update();
         }
     },
     {
         name: 'Add Data',
         handler(chart) {
             const data = chart.data;
             if (data.datasets.length > 0) {
                 data.labels = Utils.months({count: data.labels.length + 1});

                 for (let index = 0; index < data.datasets.length; ++index) {
                     data.datasets[index].data.push(Utils.rand(-100, 100));
                 }

                 chart.update();
             }
         }
     },
     {
         name: 'Remove Dataset',
         handler(chart) {
             chart.data.datasets.pop();
             chart.update();
         }
     },
     {
         name: 'Remove Data',
         handler(chart) {
             chart.data.labels.splice(-1, 1); // remove the label first

             chart.data.datasets.forEach(dataset => {
                 dataset.data.pop();
             });

             chart.update();
         }
     }
 ];
 */

