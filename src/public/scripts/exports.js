//create event listener
document.getElementById('csv').addEventListener('click', exportCSV);

function exportCSV() {
    console.log('button csv clicked');
    //create XHR Object
    var xhr = new XMLHttpRequest();
    //OPEN - type, url/file, async
    let url = 'http://localhost:3000/api/judet';
    xhr.open('GET', url, true);

    console.log('READYSTATE', xhr.readyState);

    xhr.onload = function () {
        if (this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);

            // Create the CSV content
            var csvContent = "data:text/csv;charset=utf-8,";

            // Add the CSV header
            csvContent += "County,Rate,Total,Females,Males,Paid,Not Paid,Rate (Female),Rate (Male),Luna\n";

            // Add data rows to the CSV content
            data.forEach(function (row) {
                csvContent += `${row.judet},
                ${row["Rata somajului (%)"]},
                ${row["Numar total someri"]},
                ${row["Numar total someri femei"]},
                ${row["Numar total someri barbati"]},
                ${row["Numar someri indemnizati"]},
                ${row["Numar someri neindemnizati"]},
                ${row["Rata somajului Feminina (%)"]},
                ${row["Rata somajului Masculina (%)"]},
                ${row.luna}\n`;
            });

            // Create a link element to download the CSV file
            var link = document.createElement("a");
            link.setAttribute("href", encodeURI(csvContent));
            link.setAttribute("download", "data.csv");
            link.style.display = "none";
            document.body.appendChild(link);

            // Click the link element to trigger the download
            link.click();

            // Clean up
            document.body.removeChild(link);
        } else if (this.status === 404) {
            document.getElementById('text').innerHTML = 'Not Found';
        }
    };

    xhr.onerror = function () {
        console.log('Request error...');
    };

    //sends request
    xhr.send();
}

//readyState Values
//0: request not initialised
//1: server connection established
//2: request received
//3: processing request
//4: request finished and response is ready

//HTTP Statuses
//200: "OK"
//403: "Forbidden"
//404: "Not found"
