const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const pool = require('../utils')


async function exportDataToCsv() {
    try {
        // Query the data from the database
        const query = 'SELECT * FROM map';
        const result = await pool.query(query);

        // Extracting the data from the result
        const data = result.rows.map(row => ({
            total_unemployed: row.total_unemployed,
            female_unemployed: row.female_unemployed,
            male_unemployed: row.male_unemployed,
            paid_unemployed: row.paid_unemployed,
            not_paid_unemployed: row.not_paid_unemployed,
            rate: row.rate,
            female_rate: row.female_rate,
            male_rate: row.male_rate,
            month: row.month

        }));

        // Define the CSV writer with the updated values
        const csvWriter = createCsvWriter({
            path: '../static/data.csv',
            header: [
                {id: 'county', title: 'County'},
                {id: 'total', title: 'Total'},
                {id: 'females', title: 'Females'},
                {id: 'males', title: 'Males'},
                {id: 'paid', title: 'Paid'},
                {id: 'notPaid', title: 'Not Paid'},
                {id: 'rate', title: 'Rate'},
                {id: 'rateFemale', title: 'Rate (Female)'},
                {id: 'rateMale', title: 'Rate (Male)'},
                {id: 'month', title: 'Month'},]
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
module.exports = exportDataToCsv()