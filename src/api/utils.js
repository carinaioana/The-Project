const fs = require("fs");
const {Pool} = require("pg");

const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: "localhost",
    database: "postgres",
    password: process.env.DB_PASSWORD,
    port: 5432, // default PostgresSQL port
});

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", () => {
                resolve(JSON.parse(body));
            });
        } catch (error) {
            reject(error);
        }
    });
}

const throwError = (res, err) => {
    res.statusCode = err.statusCode || 500;
    res.end(
        JSON.stringify({
            status: err.status,
            message: err.message,
        })
    );
};

module.exports = {
    writeDataToFile,
    getPostData,
    pool,
    throwError,
};
