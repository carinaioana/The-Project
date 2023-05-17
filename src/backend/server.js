var http = require('http');
var fs = require('fs');

//create a server object:
http.createServer(function (req, res) {
    fs.readFile('../views/home.html', function (err,data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data); //write a response to the client
        return res.end();
    });
}).listen(1234); //the server object listens on port 8080