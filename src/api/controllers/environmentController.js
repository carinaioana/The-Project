const {
  getAllEnvironment,
  getOneEnvironment,
} = require("../services/environmentService");

async function environmentController(req, res) {
  if (req.url === "/api/environment" && req.method === "GET") {
    await getAllEnvironment(req, res);
  } else if (
    req.url.match(/\/api\/environment\/[A-Za-z\s]+/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    await getOneEnvironment(req, res, id);
  } else if (
    req.url.match(
      /\/api\/environment\?month=\d+&county=[A-Za-z\s]+&column=[A-Za-z_]+/
    ) &&
    req.method === "GET"
  ) {
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const month = urlParams.get("month");
    const county = urlParams.get("county");
    const column = urlParams.get("column");
    await getByMonthAndId(req, res, month, county, column);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
}

/*} else if (req.url === "/api/environment" && req.method === "POST") {
  await createEnvironment(req, res);
} else if (
  req.url.match(/\/api\/environment\/[A-Za-z\s]+/) &&
  req.method === "PUT"
) {
  const id = req.url.split("/")[3];
  await updateEnvironment(req, res, id);
} else if (
  req.url.match(/\/api\/environment\/[A-Za-z\s]+/) &&
  req.method === "DELETE"
) {
  const id = req.url.split("/")[3];
  await deleteEnvironment(req, res, id);
} else if (req.url.match(/\/api\/environment\/\d+/) && req.method === "GET") {
  const month = req.url.split("/")[3];
  await getByMonth(req, res, month);*/

module.exports = environmentController;
