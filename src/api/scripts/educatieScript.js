const { Pool } = require('pg');
const fs = require('fs');
const jsonData = require('../../static/file.json');

// Configuration for PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432, // default PostgresSQL port
});

async function insertData() {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS educatie (
        JUDET varchar,
        "Total someri" integer,
        "fara studii" integer,
        "invatamant primar" integer,
        "invatamant gimnazial" integer,
        "invatamant liceal" integer,
        "invatamant posticeal" integer,
        "invatamant profesional/arte si meserii" integer,
        "invatamant universitar" integer
      );
    `);

        // Iterate through each JSON record and insert into the table
        for (const record of jsonData) {
            const insertQuery = {
                text: `
          INSERT INTO educatie (
            JUDET,
            "Total someri",
            "fara studii",
            "invatamant primar",
            "invatamant gimnazial",
            "invatamant liceal",
            "invatamant posticeal",
            "invatamant profesional/arte si meserii",
            "invatamant universitar"
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
        `,
                values: [
                    record["JUDET"],
                    parseInt(record["Total someri, din care: "]),
                    parseInt(record["fara studii"]),
                    parseInt(record["invatamant primar "]),
                    parseInt(record["invatamant gimnazial "]),
                    parseInt(record["invatamant liceal"]),
                    parseInt(record["invatamant posticeal"]),
                    parseInt(record["invatamant profesional/arte si meserii"]),
                    parseInt(record["invatamant universitar"]),
                ],
            };

            await pool.query(insertQuery);
        }

        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        pool.end(); // Close the connection pool
    }
}

insertData();
