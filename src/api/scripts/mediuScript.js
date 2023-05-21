const fs = require('fs');
const { Pool } = require('pg');
const data = require('../../static/file.json');

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
      CREATE TABLE IF NOT EXISTS mediu (
        judet                                varchar,
        numar_total_someri                   integer,
        numar_total_someri_femei             integer,
        numar_total_someri_barbati           integer,
        numar_total_someri_din_mediul_urban  integer,
        numar_someri_femei_din_mediul_urban  integer,
        numar_someri_barbati_din_mediul_urban integer,
        numar_total_someri_din_mediul_rural  integer,
        numar_someri_femei_din_mediul_rural  integer,
        numar_someri_barbati_din_mediul_rural integer
      );
    `);

        for (const row of data) {
            const {
                JUDET,
                "NUMAR TOTAL SOMERI": numar_total_someri,
                "NUMAR TOTAL SOMERI FEMEI": numar_total_someri_femei,
                "NUMAR TOTAL SOMERI BARBATI": numar_total_someri_barbati,
                "NUMAR TOTAL SOMERI DIN MEDIUL URBAN": numar_total_someri_din_mediul_urban,
                "NUMAR SOMERI FEMEI DIN MEDIUL URBAN": numar_someri_femei_din_mediul_urban,
                "NUMAR SOMERI BARBATI DIN MEDIUL URBAN": numar_someri_barbati_din_mediul_urban,
                "NUMAR TOTAL SOMERI DIN MEDIUL RURAL": numar_total_someri_din_mediul_rural,
                "NUMAR SOMERI FEMEI DIN MEDIUL RURAL": numar_someri_femei_din_mediul_rural,
                "NUMAR SOMERI BARBATI DIN MEDIUL RURAL": numar_someri_barbati_din_mediul_rural
            } = row;

            await pool.query(`
        INSERT INTO mediu (
          judet,
          numar_total_someri,
          numar_total_someri_femei,
          numar_total_someri_barbati,
          numar_total_someri_din_mediul_urban,
          numar_someri_femei_din_mediul_urban,
          numar_someri_barbati_din_mediul_urban,
          numar_total_someri_din_mediul_rural,
          numar_someri_femei_din_mediul_rural,
          numar_someri_barbati_din_mediul_rural
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
      `, [
                JUDET,
                parseInt(numar_total_someri),
                parseInt(numar_total_someri_femei),
                parseInt(numar_total_someri_barbati),
                parseInt(numar_total_someri_din_mediul_urban),
                parseInt(numar_someri_femei_din_mediul_urban),
                parseInt(numar_someri_barbati_din_mediul_urban),
                parseInt(numar_total_someri_din_mediul_rural),
                parseInt(numar_someri_femei_din_mediul_rural),
                parseInt(numar_someri_barbati_din_mediul_rural)
            ]);
        }

        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        pool.end();
    }
}

insertData();
