const http = require('http');
const { getAllData, getOneData, createData, updateData } = require('../controllers/dataController')

const server = http.createServer((req, res) => {
    if(req.url === '/api/data' && req.method === 'GET'){
        getAllData(req, res)
    } else if(req.url.match(/\/api\/data\/ROU\d{3}$/) && req.method === 'GET')
    {
        const id = req.url.split('/')[3]
        getOneData(req, res, id)
    }/*else if(req.url === 'api/products' && req.method === 'POST') {
        createData(req, res)

    } */ else if(req.url.match(/\/api\/data\/ROU\d{3}$/) && req.method === 'PUT')
    {
        const id = req.url.split('/')[3]
        updateData(req, res, id)
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message:'Route Not Found'}))
    }

})
const PORT = process.env.PORT || 1234;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
module.exports = server;