const {pool} = require("../utils");
const {v4: uuidv4} = require("uuid");

function findAll() {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await pool.connect();
            const result = await client.query("SELECT * FROM map");
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
            const result = await client.query(
                "SELECT * FROM map WHERE county = $1",
                [id]
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

function findByMonth(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await pool.connect();
            const result = await client.query(
                "SELECT * FROM map WHERE month = $1",
                [id]
            );
            client.release();

            if (result.rows.length === 0) {
                resolve(null);
            } else {
                resolve(result.rows);
            }
        } catch (error) {
            reject(error);
        }
    });
}

function create(data) {
    return new Promise(async (resolve, reject) => {
        const {
            county,
            total_unemployed,
            female_unemployed,
            male_unemployed,
            paid_unemployed,
            not_paid_unemployed,
            rate,
            female_rate,
            male_rate,
            month
        } = data;

        try {
            const client = await pool.connect();
            const result = await client.query(
                'INSERT INTO map (county, total_unemployed, female_unemployed,male_unemployed, paid_unemployed, not_paid_unemployed, rate, female_rate,male_rate,month) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *',
                [
                    county,
                    total_unemployed,
                    female_unemployed,
                    male_unemployed,
                    paid_unemployed,
                    not_paid_unemployed,
                    rate,
                    female_rate,
                    male_rate,
                    month
                ]
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
        const {
            total_unemployed,
            female_unemployed,
            male_unemployed,
            paid_unemployed,
            not_paid_unemployed,
            rate,
            female_rate,
            male_rate,
            month
        } = data;
        try {
            const client = await pool.connect();
            const result = await client.query(
                `UPDATE map
                 SET total_unemployed= $1,
                     female_unemployed   = $2,
                     male_unemployed     = $3,
                     paid_unemployed     = $4,
                     not_paid_unemployed = $5,
                     rate                = $6,
                     female_rate         = $7,
                     male_rate           = $8,
                     month               = $9
                 WHERE county = $10
                 RETURNING *`,
                [
                    total_unemployed,
                    female_unemployed,
                    male_unemployed,
                    paid_unemployed,
                    not_paid_unemployed,
                    rate,
                    female_rate,
                    male_rate,
                    month,
                    id,
                ]
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
            await client.query("DELETE FROM map WHERE county=$1", [id]);
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
    findByMonth
};
