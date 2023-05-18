const http = require('http');
const fs = require('fs');
const hostname = 'localhost';

const server = http.createServer(((req, res) => {
    if(req.url === '/api/data' && req.method === 'GET'){
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(data))
    }else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message:'Route Not Found'}))
    }

}))

const PORT = process.env.PORT || 1234;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
