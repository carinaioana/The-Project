const {
    getAllAges,
    getOneAge,
    createAge,
    updateAge,
    deleteAge,
    getByIdAndMonth
} = require("../services/ageService");
const {getByMonthAndColumn} = require("../services/environmentService");

async function ageController(req, res) {
    //API age
    if (req.url === "/api/age" && req.method === "GET") {
        await getAllAges(req, res);
    } else if (
        req.url.match(/\/api\/age\/[A-Za-z\s]+/) &&
        req.method === "GET"
    ) {
        const id = req.url.split("/")[3];
        await getOneAge(req, res, id);
    } else if (req.url === "/api/age" && req.method === "POST") {
        await createAge(req, res);
    } else if (
        req.url.match(/\/api\/age\/[A-Za-z\s]+/) &&
        req.method === "PUT"
    ) {
        const id = req.url.split("/")[3];
        await updateAge(req, res, id);
    } else if (
        req.url.match(/\/api\/age\/[A-Za-z\s]+/) &&
        req.method === "DELETE"
    ) {
        const id = req.url.split("/")[3];
        await deleteAge(req, res, id);
    } else if (
        req.url.match(/\/api\/age\?month=\d+&county=[A-Za-z_]+/) &&
        req.method === "GET"
    ) {
        const urlParams = new URLSearchParams(req.url.split("?")[1]);
        const county = urlParams.get("county");
        const month = urlParams.get("month");
        await getByIdAndMonth(req, res, county, month);
    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: "Route Not Found"}));
    }
}

module.exports = ageController;
