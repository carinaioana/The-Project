const http = require('http');
const { getAllData, getOneData, createData, updateData, deleteData } = require('../controllers/educatieController')
const { exportDataToCsv } = require('../controllers/exportCSVController')
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432, // default PostgresSQL port
});


const server = http.createServer((req, res) => {
    //API educatie
    if(req.url === '/api/educatie' && req.method === 'GET'){
        getAllData(req, res)
    } else if(req.url.match(/\/api\/data\/[A-Za-z\s]+/) && req.method === 'GET')
    {
        const id = req.url.split('/')[3]
        getOneData(req, res, id)
    } else if(req.url === '/api/educatie' && req.method === 'POST')
    {
        createData(req, res)
    }  else if(req.url.match(/\/api\/educatie\/[A-Za-z\s]+/) && req.method === 'PUT')
    {
        const id = req.url.split('/')[3]
        updateData(req, res, id)
    } else if(req.url.match(/\/api\/educatie\/[A-Za-z\s]+/) && req.method === 'DELETE')
    {
        const id = req.url.split('/')[3]
        deleteData(req, res, id)
    }
    //API mediu
    else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message:'Route Not Found'}))
    }

})
const PORT = process.env.PORT || 1234;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
module.exports = server;