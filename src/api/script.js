const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

async function loadData() {
    try {
        // Read the data from the JSON file
        const jsonData = fs.readFileSync('../static/data.json', 'utf8');
        const data = JSON.parse(jsonData);

        // Iterate over the data and insert each record into the database
        for (const record of data) {
            const { county, rate, total, females, males, paid, notpaid, id } = record;

            // Insert the record into the database
            const query = `
        INSERT INTO data (county, rate, total, females, males, paid, notpaid, id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
            const values = [county, rate, total, females, males, paid, notpaid, id];

            await pool.query(query, values);
        }

        console.log('Data loaded successfully');
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        // Close the database connection
        pool.end();
    }
}

loadData();
