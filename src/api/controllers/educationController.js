const {
    getAllEdu,
    getOneEdu,
    createEdu,
    updateEdu,
    deleteEdu, getByMonth, getByMonthAndId
} = require("../services/educationService");

async function educationController(req, res) {
    //API education
    if (req.url === "/api/education" && req.method === "GET") {
        await getAllEdu(req, res);
    } else if (
        req.url.match(/\/api\/education\/[A-Za-z\s]+/) &&
        req.method === "GET"
    ) {
        const id = req.url.split("/")[3];
        await getOneEdu(req, res, id);
    } else if (req.url === "/api/education" && req.method === "POST") {
        await createEdu(req, res);
    } else if (
        req.url.match(/\/api\/education\/[A-Za-z\s]+/) &&
        req.method === "PUT"
    ) {
        const id = req.url.split("/")[3];
        await updateEdu(req, res, id);
    } else if (
        req.url.match(/\/api\/education\/[A-Za-z\s]+/) &&
        req.method === "DELETE"
    ) {
        const id = req.url.split("/")[3];
        await deleteEdu(req, res, id);
    } else if (
        req.url.match(/\/api\/education\/\d+/) &&
        req.method === "GET"
    ) {
        const month = req.url.split("/")[3];
        await getByMonth(req, res, month);
    } else if (req.url.match(/\/api\/education\?month=\d+&county=[A-Za-z\s]+&column=[A-Za-z_]+/) && req.method === "GET") {
        const urlParams = new URLSearchParams(req.url.split("?")[1]);
        const month = urlParams.get("month");
        const county = urlParams.get("county");
        const column = urlParams.get("column");
        await getByMonthAndId(req, res, month, county, column);
    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: "Route Not Found"}));
    }
}

module.exports = educationController;
