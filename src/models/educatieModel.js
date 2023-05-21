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
            const result = await client.query('SELECT * FROM educatie');
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
            const result = await client.query('SELECT * FROM educatie WHERE judet = $1', [id]);
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
        const {judet,  total_someri, fara_studii, invatamant_primar, invatamant_gimnazial, invatamant_liceal, invatamant_posticeal, invatamant_profesional,invatamant_universitar,luna } = data;

        try {
            const client = await pool.connect();
            const result = await client.query(
                'INSERT INTO educatie (judet, "Total someri", "fara studii", "invatamant primar", "invatamant gimnazial", "invatamant liceal", "invatamant posticeal", "invatamant profesional/arte si meserii","invatamant universitar",luna) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *',
                [judet, total_someri, fara_studii, invatamant_primar, invatamant_gimnazial, invatamant_liceal, invatamant_posticeal,invatamant_profesional, invatamant_universitar, luna]
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
        const {total_someri, fara_studii, invatamant_primar, invatamant_gimnazial, invatamant_liceal, invatamant_posticeal, invatamant_profesional,invatamant_universitar,luna } = data;
        try {
            const client = await pool.connect();
            const result = await client.query(
                `UPDATE educatie SET
                                     "Total someri" = $1,
                                     "fara studii" = $2,
                                     "invatamant primar" = $3,
                                     "invatamant gimnazial" = $4,
                                     "invatamant liceal" = $5,
                                     "invatamant posticeal" = $6,
                                     "invatamant profesional/arte si meserii" = $7,
                                     "invatamant universitar" = $8,
                                     luna = $9
                 WHERE judet = $10
                 RETURNING *`,
                [total_someri, fara_studii, invatamant_primar, invatamant_gimnazial, invatamant_liceal, invatamant_posticeal, invatamant_profesional, invatamant_universitar, luna, id]
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
            await client.query('DELETE FROM educatie WHERE judet=$1', [id]);
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
