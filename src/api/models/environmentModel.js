const {pool} = require("../utils");
const {v4: uuidv4} = require("uuid");

async function findAll() {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM environment");
        client.release();
        console.log(result.rows);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

function findById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await pool.connect();
            const result = await client.query(
                "SELECT * FROM environment WHERE county = $1",
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

/*
function create(data) {
  return new Promise(async (resolve, reject) => {
    const {
      county,
      total_unemployed,
      female_unemployed,
      male_unemployed,
      total_urban,
      female_urban,
      male_urban,
      total_rural,
      female_rural,
      male_rural,
    } = data;

    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO environment (county,\n" +
          "      total_unemployed,\n" +
          "      female_unemployed,\n" +
          "      male_unemployed,\n" +
          "      total_urban,\n" +
          "      female_urban,\n" +
          "      male_urban,\n" +
          "      total_rural,\n" +
          "      female_rural,\n" +
          "      male_rural) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *",
        [
          county,
          total_unemployed,
          female_unemployed,
          male_unemployed,
          total_urban,
          female_urban,
          male_urban,
          total_rural,
          female_rural,
          male_rural,
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
      total_urban,
      female_urban,
      male_urban,
      total_rural,
      female_rural,
      male_rural,
    } = data;
    try {
      const client = await pool.connect();
      const result = await client.query(
        `UPDATE education
                 SET total_unemployed  = $1,
                     female_unemployed = $2,
                     male_unemployed   = $3,
                     total_urban       = $4,
                     female_urban      = $5,
                     male_urban        = $6,
                     total_rural       = $7,
                     female_rural      = $8,
                     male_rural        = $9
                 WHERE county = $10 RETURNING *`,
        [
          total_unemployed,
          female_unemployed,
          male_unemployed,
          total_urban,
          female_urban,
          male_urban,
          total_rural,
          female_rural,
          male_rural,
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
*/

function remove(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await pool.connect();
            await client.query("DELETE FROM environment WHERE county=$1", [id]);
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
                "SELECT * FROM environment WHERE month = $1",
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

function findByMonthAndColumn(month, column) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await pool.connect();
            const query = `SELECT county, ${column}
                           FROM environment
                           WHERE month = $1`;
            const values = [month];

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
    remove,
    findByMonthAndColumn,
};
