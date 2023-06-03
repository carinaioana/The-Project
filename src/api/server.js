const http = require("http");
const cors = require("cors");
const authController = require("./controllers/authenticationController");
const countyController = require("./controllers/mapController");
const educationController = require("./controllers/educationController");
const ageController = require("./controllers/ageController")
const viewsController = require("./controllers/viewsController");
const adminController = require("./controllers/adminController");

const {
    checkAdminToken,
    checkTokenMiddleware,
} = require("./services/auth/tokenMiddleware");
const environmentController = require("./controllers/environmentController");
const corsMiddleware = cors();

const server = http.createServer((req, res) => {
    corsMiddleware(req, res, () => {
        // Apply the middleware before calling the route handlers
        if (req.url.startsWith("/api/auth")) {
            authController(req, res);
        } else if (req.url.startsWith("/api/map")) {
            checkTokenMiddleware(req, res, () => countyController(req, res));
        } else if (req.url.startsWith("/api/education")) {
            checkTokenMiddleware(req, res, () => educationController(req, res));
        } else if (req.url.startsWith("/api/age")) {
            checkTokenMiddleware(req, res, () => ageController(req, res));
        } else if (req.url.startsWith("/api/environment")) {
            checkTokenMiddleware(req, res, () => environmentController(req, res));
        } else if (req.url.startsWith("/api/users")) {
            checkTokenMiddleware(req, res, () =>
                checkAdminToken(req, res, () => adminController(req, res))
            );
        } else if (req.url.startsWith("/")) {
            viewsController(req, res);
        } else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Route Not Found"}));
        }
    });
});

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = server;
