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

/*
create table if not exists data
(
    county  varchar,
    rate    varchar,
    total   integer,
    females integer,
    males   integer,
    paid    integer,
    notpaid integer,
    id      varchar not null
constraint data_pk
primary key
);

alter table data
owner to postgres;

*/
/*
create table if not exists public.data
(
    county  varchar,
    rate    varchar,
    total   integer,
    females integer,
    males   integer,
    paid    integer,
    notpaid integer,
    id      varchar not null
constraint data_pk
primary key
);

alter table public.data
owner to postgres;

create table if not exists public.educatie
(
    judet                                    varchar,
    "Total someri"                           integer,
    "fara studii"                            integer,
    "invatamant primar"                      integer,
    "invatamant gimnazial"                   integer,
    "invatamant liceal"                      integer,
    "invatamant posticeal"                   integer,
    "invatamant profesional/arte si meserii" integer,
    "invatamant universitar"                 integer,
    luna                                     varchar
);

alter table public.educatie
owner to postgres;

create table if not exists public.grupa_varsta
(
    judet    varchar,
    total    integer,
    sub_25   integer,
    "25_29"  integer,
    "30_39"  integer,
    "40_49"  integer,
    "50_55"  integer,
    peste_55 integer,
    luna     varchar
);

alter table public.grupa_varsta
owner to postgres;

create table if not exists public.judet
(
    judet                          varchar,
    "Numar total someri"           varchar,
    "Numar total someri femei"     varchar,
    "Numar total someri barbati"   varchar,
    "Numar someri indemnizati"     varchar,
    "Numar someri neindemnizati"   varchar,
    "Rata somajului (%)"           numeric,
    "Rata somajului Feminina (%)"  numeric,
    "Rata somajului Masculina (%)" numeric,
    luna                           varchar
);

alter table public.judet
owner to postgres;

create table if not exists public.mediu
(
    judet                                 varchar,
    numar_total_someri                    integer,
    numar_total_someri_femei              integer,
    numar_total_someri_barbati            integer,
    numar_total_someri_din_mediul_urban   integer,
    numar_someri_femei_din_mediul_urban   integer,
    numar_someri_barbati_din_mediul_urban integer,
    numar_total_someri_din_mediul_rural   integer,
    numar_someri_femei_din_mediul_rural   integer,
    numar_someri_barbati_din_mediul_rural integer,
    luna                                  varchar
);

alter table public.mediu
owner to postgres;

*/

