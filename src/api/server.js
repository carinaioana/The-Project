const http = require("http");
const cors = require("cors");
const authController = require("./controllers/authenticationController");
const countyController = require("./controllers/mapController");
const educationController = require("./controllers/educationController");
const viewsController = require("./controllers/viewsController");
const ageController = require("./controllers/ageController")

const server = http.createServer((req, res) => {
    // Enable CORS
    cors()(req, res, () => {
        // Continue with the request handling
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // Request handling logic
        if (req.url.startsWith("/api/auth")) {
            authController(req, res);
        } else if (req.url.startsWith("/api/map")) {
            countyController(req, res);
        } else if (req.url.startsWith("/api/education")) {
            educationController(req, res);
        } else if (req.url.startsWith("/api/age")) {
            ageController(req, res);
        } else if (req.url.startsWith("/")) {
            viewsController(req, res);
        } else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Route Not Found"}));
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = server;
