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
      CREATE TABLE IF NOT EXISTS judet (
        judet                          varchar,
        "Numar total someri"           varchar,
        "Numar total someri femei"     varchar,
        "Numar total someri barbati"   varchar,
        "Numar someri indemnizati"     varchar,
        "Numar someri neindemnizati"   varchar,
        "Rata somajului (%)"           numeric,
        "Rata somajului Feminina (%)"  numeric,
        "Rata somajului Masculina (%)" numeric
      );
    `);

        // Iterate through each JSON record and insert into the table
        for (const record of jsonData) {
            const insertQuery = {
                text: `
          INSERT INTO judet (
            judet,
            "Numar total someri",
            "Numar total someri femei",
            "Numar total someri barbati",
            "Numar someri indemnizati",
            "Numar someri neindemnizati",
            "Rata somajului (%)",
            "Rata somajului Feminina (%)",
            "Rata somajului Masculina (%)"
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
        `,
                values: [
                    record["JUDET"].trim(),
                    record["Numar total someri"].trim(),
                    record["Numar total someri femei"].trim(),
                    record["Numar total someri barbati"].trim(),
                    record["Numar someri indemnizati"].trim(),
                    record["Numar someri neindemnizati"].trim(),
                    parseFloat(record["Rata somajului (%)"].trim()),
                    parseFloat(record["Rata somajului Feminina (%)"].trim()),
                    parseFloat(record["Rata somajului Masculina (%)"].trim()),
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
