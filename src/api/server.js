const http = require('http');
const { getAllEdu, getOneEdu, createEdu, updateEdu, deleteEdu } = require('../controllers/educatieController')
const { getAllCounties, getOneCounty,  createCounty, updateCounty, deleteCounty } = require('../controllers/judetController')
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

        getAllEdu(req, res)
    } else if(req.url.match(/\/api\/data\/[A-Za-z\s]+/) && req.method === 'GET')
    {
        const id = req.url.split('/')[3]
        getOneEdu(req, res, id)
    } else if(req.url === '/api/educatie' && req.method === 'POST')
    {
        createEdu(req, res)
    }  else if(req.url.match(/\/api\/educatie\/[A-Za-z\s]+/) && req.method === 'PUT')
    {
        const id = req.url.split('/')[3]
        updateEdu(req, res, id)
    } else if(req.url.match(/\/api\/educatie\/[A-Za-z\s]+/) && req.method === 'DELETE')
    {
        const id = req.url.split('/')[3]
        deleteEdu(req, res, id)
    }
    //API judet
    else if(req.url === '/api/judet' && req.method === 'GET'){

        getAllCounties(req, res)
    } else if(req.url.match(/\/api\/judet\/[A-Za-z\s]+/) && req.method === 'GET')
    {
        const id = req.url.split('/')[3]
        getOneCounty(req, res, id)
    } else if(req.url === '/api/judet' && req.method === 'POST')
    {
        createCounty(req, res)
    }  else if(req.url.match(/\/api\/judet\/[A-Za-z\s]+/) && req.method === 'PUT')
    {
        const id = req.url.split('/')[3]
        updateCounty(req, res, id)
    } else if(req.url.match(/\/api\/judet\/[A-Za-z\s]+/) && req.method === 'DELETE')
    {
        const id = req.url.split('/')[3]
        deleteCounty(req, res, id)
    }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message:'Route Not Found'}))
    }

})
const PORT = process.env.PORT || 1234;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
module.exports = server;