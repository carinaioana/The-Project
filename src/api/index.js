const http = require('http');
const { getAllData, getOneData, createData, updateData, deleteData } = require('../controllers/dataController')
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432, // default PostgresSQL port
});
// Function to query the database
const query = async (text, params) => {
    try {
        const client = await pool.connect();
        const result = await client.query(text, params);
        client.release();
        return result;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

const server = http.createServer((req, res) => {
    if(req.url === '/api/data' && req.method === 'GET'){
        getAllData(req, res)
    } else if(req.url.match(/\/api\/data\/ROU\d{3}$/) && req.method === 'GET')
    {
        const id = req.url.split('/')[3]
        getOneData(req, res, id)
    } else if(req.url === '/api/data' && req.method === 'POST')
    {
        createData(req, res)
    }  else if(req.url.match(/\/api\/data\/ROU\d{3}$/) && req.method === 'PUT')
    {
        const id = req.url.split('/')[3]
        updateData(req, res, id)
    } else if(req.url.match(/\/api\/data\/ROU\d{3}$/) && req.method === 'DELETE')
    {
        const id = req.url.split('/')[3]
        deleteData(req, res, id)
    }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message:'Route Not Found'}))
    }

})
const PORT = process.env.PORT || 1234;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
module.exports = server;