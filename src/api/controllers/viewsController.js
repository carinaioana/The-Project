const fs = require("fs");
const path = require("path");
const url = require("url");

const mimeTable = {
    ".js": "application/javascript",
    ".html": "text/html",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".json": "application/json",
    ".txt": "text/plain",
    ".gif": "image/gif",
};
const sendFile = (req, res, filePath) => {
    const fileExt = path.extname(filePath);
    const contentType = mimeTable[fileExt] || "application/octet-stream";
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end("Internal Server Error");
        } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", contentType);
            res.end(data);
        }
    });
};

function serveStaticFile(req, res, filePath) {
    const absolutePath = path.join(__dirname, "..", "..", filePath);
    console.log(absolutePath);
    fs.access(absolutePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.statusCode = 404;
            res.end("Not Found");
        } else {
            sendFile(req, res, absolutePath);
        }
    });
}

function viewsController(req, res) {
    const absolutePath = path.join(__dirname, "..", "..");
    if (req.url === "/" || req.url === "/home") {
        console.log("/views/index.html");
        sendFile(req, res, absolutePath + "/views/index.html");
    } else if (req.url === "/map") {
        sendFile(req, res, absolutePath + "/views/charts/mapChart.html");
    } else if (req.url === "/bar-chart") {
        sendFile(req, res, absolutePath + "/views/charts/barChart.html");
    } else if (req.url === "/pie-chart") {
        sendFile(req, res, absolutePath + "/views/charts/pieChart.html");
    } else if (req.url === "/age-chart") {
        sendFile(req, res, absolutePath + "/views/charts/ageChart.html");
    } else if (req.url === "/login") {
        sendFile(req, res, absolutePath + "/views/auth/login.html");
    } else if (req.url === "/register") {
        sendFile(req, res, absolutePath + "/views/auth/register.html");
    } else if (req.url === "/about-us") {
        sendFile(req, res, absolutePath + "/views/about-us.html");
    } else if (req.url === "/admin") {
        sendFile(req, res, absolutePath + "/views/auth/admin-page.html");
    } else if (req.url.startsWith("/public/")) {
        const filePath = req.url.slice(1); // Remove the leading slash
        serveStaticFile(req, res, filePath);
    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
}

module.exports = viewsController;
