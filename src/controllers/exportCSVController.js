const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

async function exportDataToCsv() {
    try {
        // Query the data from the database
        const query = 'SELECT * FROM data'; //maybe use function?
        const result = await pool.query(query);

        // Extracting the data from the result
        const data = result.rows;

        // Defining the CSV writer
        const csvWriter = createCsvWriter({
            path: '../static/data.csv',
            header: [
                // Defining CSV columns headers
                { id: 'county', title: 'County' },
                { id: 'rate', title: 'Rate' },
                { id: 'total', title: 'Total' },
                { id: 'females', title: 'Females' },
                { id: 'males', title: 'Males' },
                { id: 'paid', title: 'Paid' },
                { id: 'notpaid', title: 'Not Paid' },
                { id: 'id', title: 'ID' },
            ],
        });

        // Write the data to the CSV file
        await csvWriter.writeRecords(data);

        console.log('Data exported to data.csv successfully');
    } catch (error) {
        console.error('Error exporting data:', error);
    } finally {
        // Close the database connection
        pool.end();
    }
}

// Call the exportDataToCsv function to initiate the data export
exportDataToCsv();

