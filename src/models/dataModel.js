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
            const result = await client.query('SELECT * FROM data');
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
            const result = await client.query('SELECT * FROM data WHERE id = $1', [id]);
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
        const { county, rate, total, females, males, paid, notpaid } = data;

        try {
            const client = await pool.connect();
            const result = await client.query(
                'INSERT INTO data (county, rate, total, females, males, paid, notpaid, id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [county, rate, total, females, males, paid, notpaid, uuidv4()]
            );
            client.release();
            resolve(result.rows[0]);
        } catch (error) {
            reject(error);
        }
    });
}

function update(id, data) {
    return new Promise(async (resolve, reject) => {
        const { county, rate, total, females, males, paid, notpaid } = data;

        try {
            const client = await pool.connect();
            const result = await client.query(
                'UPDATE data SET county=$1, rate=$2, total=$3, females=$4, males=$5, paid=$6, notpaid=$7 WHERE id=$8 RETURNING *',
                [county, rate, total, females, males, paid, notpaid, id]
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
            await client.query('DELETE FROM data WHERE id=$1', [id]);
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
