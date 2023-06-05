const {
    getAllCounties,
    getOneCounty,
    createCounty,
    updateCounty,
    deleteCounty,
    getOneMonth, getByMonthAndFilter
} = require("../services/mapService");
const {getByMonthAndId} = require("../services/educationService");

async function mapController(req, res) {
    //API map
    if (req.url === "/api/map" && req.method === "GET") {
        await getAllCounties(req, res);
    } else if (
        req.url.match(/\/api\/map\/[A-Za-z\s]+/) &&
        req.method === "GET"
    ) {
        const id = req.url.split("/")[3];
        await getOneCounty(req, res, id);
    } else if (
        req.url.match(/\/api\/map\/[0-9]+/) &&
        req.method === "GET"
    ) {
        const id = req.url.split("/")[3];
        await getOneMonth(req, res, id);
    } else if (req.url === "/api/map" && req.method === "POST") {
        await createCounty(req, res);
    } else if (
        req.url.match(/\/api\/map\/[A-Za-z\s]+/) &&
        req.method === "PUT"
    ) {
        const id = req.url.split("/")[3];
        await updateCounty(req, res, id);
    } else if (
        req.url.match(/\/api\/map\/[A-Za-z\s]+/) &&
        req.method === "DELETE"
    ) {
        const id = req.url.split("/")[3];
        await deleteCounty(req, res, id);
    } else if (req.url.match(/\/api\/map\?month=\d+&filter=[a-zA-Z_]+/) && req.method === "GET") {
        const urlParams = new URLSearchParams(req.url.split("?")[1]);
        const month = urlParams.get("month");
        const filter = urlParams.get("filter");
        await getByMonthAndFilter(req, res, month, filter);
    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: "Route Not Found"}));
    }
}

module.exports = mapController;
