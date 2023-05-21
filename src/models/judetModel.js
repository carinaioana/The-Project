const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432, // default PostgreSQL port
});

function findAll() {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM judet');
            client.release();
            resolve(result.rows);
        } catch (error) {
            reject(error);
        }
    });
}

function findById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM judet WHERE judet = $1', [id]);
            client.release();

            if (result.rows.length === 0) {
                resolve(null);
            } else {
                resolve(result.rows[0]);
            }
        } catch (error) {
            reject(error);
        }
    });
}

function create(data) {
    return new Promise(async (resolve, reject) => {
        const {judet, total, total_femei, total_barbati, indemnizati, neindemnizati, rata_somajului, rata_feminina,rata_masculina,luna} = data;

        try {
            const client = await pool.connect();
            const result = await client.query(
                'INSERT INTO judet (judet, "Numar total someri", "Numar total someri femei","Numar total someri barbati", "Numar someri indemnizati", "Numar someri neindemnizati", "Rata somajului (%)", "Rata somajului Feminina (%)","Rata somajului Masculina (%)",luna) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *',
                [
                    judet,
                    total,
                    total_femei,
                    total_barbati,
                    indemnizati,
                    neindemnizati,
                    rata_somajului,
                    rata_feminina,
                    rata_masculina,
                    luna
                ]
            )
            client.release();
            resolve(result.rows[0]);
        } catch (error) {
            reject(error);
        }
    });
}

function update(id, data) {
    return new Promise(async (resolve, reject) => {
        const {total, total_femei, total_barbati, indemnizati, neindemnizati, rata_somajului, rata_feminina,rata_masculina,luna } = data;
        try {
            const client = await pool.connect();
            const result = await client.query(
                `UPDATE judet SET
                                     "Numar total someri" = $1,
                                     "Numar total someri femei" = $2,
                                     "Numar total someri barbati" = $3,
                                     "Numar someri indemnizati" = $4,
                                     "Numar someri neindemnizati" = $5,
                                     "Rata somajului (%)" = $6,
                                     "Rata somajului Feminina (%)" = $7,
                                     "Rata somajului Masculina (%)" = $8,
                                     luna = $9
                 WHERE judet = $10
                 RETURNING *`,
                [total, total_femei, total_barbati, indemnizati, neindemnizati, rata_somajului, rata_feminina,rata_masculina,luna, id]
            );
            client.release();
            if (result.rows.length === 0) {
                resolve(null);
            } else {
                resolve(result.rows[0]);
            }
        } catch (error) {
            reject(error);
        }
    });
}

function remove(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await pool.connect();
            await client.query('DELETE FROM judet WHERE judet=$1', [id]);
            client.release();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
