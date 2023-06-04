const fs = require('fs');
const { Pool } = require('pg');
const jsonData = require('../../static/file.json');

// Configuration for PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432, // Default PostgreSQL port
});

// JSON data to be inserted into the table

async function insertData() {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS grupa_varsta (
        judet VARCHAR,
        total INTEGER,
        sub_25 INTEGER,
        "25_29" INTEGER,
        "30_39" INTEGER,
        "40_49" INTEGER,
        "50_55" INTEGER,
        peste_55 INTEGER
      );
    `);

        // Iterate through each JSON record and insert into the table
        for (const record of jsonData) {
            const insertQuery = {
                text: `
          INSERT INTO grupa_varsta (
            judet,
            total,
            sub_25,
            "25_29",
            "30_39",
            "40_49",
            "50_55",
            peste_55
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `,
                values: [
                    record.judet,
                    parseInt(record.TOTAL),
                    parseInt(record['Sub 25 ani']),
                    parseInt(record['25 - 29 ani']),
                    parseInt(record['30 - 39 ani']),
                    parseInt(record['40 - 49 ani']),
                    parseInt(record['50 - 55 ani']),
                    parseInt(record['peste 55 ani']),
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
