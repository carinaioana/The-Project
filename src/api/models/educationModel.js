const {pool} = require("../utils");
const {v4: uuidv4} = require("uuid");

function findAll() {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await pool.connect();
            const result = await client.query("SELECT * FROM education");
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
                "SELECT * FROM education WHERE county = $1",
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

function create(data) {
    return new Promise(async (resolve, reject) => {
        const {
            county,
            total_unemployed,
            no_studies,
            primary,
            secondary,
            highschool,
            post_secondary,
            professional,
            university,
            month
        } = data;

        try {
            const client = await pool.connect();
            const result = await client.query(
                'INSERT INTO education (county, total_unemployed, no_studies, "primary", secondary, highschool, post_secondary, professional,university,month) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *',
                [
                    county,
                    total_unemployed,
                    no_studies,
                    primary,
                    secondary,
                    highschool,
                    post_secondary,
                    professional,
                    university,
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
            no_studies,
            primary,
            secondary,
            highschool,
            post_secondary,
            professional,
            university,
            month
        } = data;
        try {
            const client = await pool.connect();
            const result = await client.query(
                `UPDATE education
                 SET total_unemployed = $1,
                     no_studies       = $2,
                     "primary"        = $3,
                     secondary        = $4,
                     highschool       = $5,
                     post_secondary   = $6,
                     professional     = $7,
                     university       = $8,
                     month            = $9
                 WHERE county = $10
                 RETURNING *`,
                [
                    total_unemployed,
                    no_studies,
                    primary,
                    secondary,
                    highschool,
                    post_secondary,
                    professional,
                    university,
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
            await client.query("DELETE FROM education WHERE county=$1", [id]);
            client.release();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

function findByMonth(month) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await pool.connect();
            const result = await client.query(
                "SELECT * FROM education WHERE month = $1",
                [month]
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

function findByMonthAndId(month, county, column) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await pool.connect();
            const query = `SELECT ${column}
                           FROM education
                           WHERE month = $1
                             AND county = $2;`;
            const values = [month, county];

            console.log(values)

            const result = await client.query(query, values);

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


module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    findByMonth,
    findByMonthAndId
};
