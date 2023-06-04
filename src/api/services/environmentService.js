const Data = require("../models/environmentModel.js");
const getAllEnvironment = async (req, res) => {
  try {
    const result = await Data.findAll();
    console.log(result);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error));
  }
};

async function getByMonthAndColumn(req, res, month, county, column) {
  try {
    const data = await Data.findByMonthAndColumn(month, county, column);

    if (!data) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Data Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    }
  } catch (error) {
    console.log(error);
  }
}

/*const getOneEnvironment = async (req, res) => {
  try {
    const result = findById();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result.rows));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error));
  }
};


}*/

module.exports = { getAllEnvironment, getByMonthAndColumn };
