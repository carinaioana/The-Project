const {pool} = require("../utils");
const {v4: uuidv4} = require("uuid");

function findAll() {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await pool.connect();
            const result = await client.query("SELECT * FROM age_group");
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
                "SELECT * FROM age_group WHERE county = $1",
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
            under_25,
            between_25_29, between_30_39, between_40_49, between_50_55,
            over_55,
            month
        } = data;

        try {
            const client = await pool.connect();
            const result = await client.query(
                'INSERT INTO age_group (county, total_unemployed, under_25, between_25_29, between_30_39, between_40_49, between_50_55, over_55,month) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
                [
                    county,
                    total_unemployed,
                    under_25,
                    between_25_29, between_30_39, between_40_49, between_50_55,
                    over_55,
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
            under_25,
            between_25_29, between_30_39, between_40_49, between_50_55,
            over_55,
            month
        } = data;
        try {
            const client = await pool.connect();
            const result = await client.query(
                `UPDATE age_group
                 SET total_unemployed= $1,
                     under_25        = $2,
                     between_25_29   = $3,
                     between_30_39   = $4,
                     between_40_49   = $5,
                     between_50_55   = $6,
                     over_55         = $7,
                     month           = $8
                 WHERE county = $9
                 RETURNING *`,
                [
                    total_unemployed,
                    under_25,
                    between_25_29, between_30_39, between_40_49, between_50_55,
                    over_55,
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
            await client.query("DELETE FROM age_group WHERE county=$1", [id]);
            client.release();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

function findByIdAndMonth(id, month) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await pool.connect();
            const query = `select county, under_25, between_25_29, between_30_39, between_40_49, between_50_55, over_55
                           from age_group
                           where county = ANY ($1::text[])
                             and month = $2;`;
            const counties = id.split(','); // Split the counties string into an array
            const values = [counties, month];

            console.log(values);

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
    findByIdAndMonth
};
