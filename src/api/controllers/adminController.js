const { pool } = require("../utils.js");
const { getUsers, deleteUser } = require("../services/auth/usersService");

async function adminController(req, res) {
  if (req.url === "/api/users" && req.method === "GET") {
    await getUsers(req, res);
  } else if (
    req.url.match(/\/api\/users\/delete\/\d+/) &&
    req.method === "DELETE"
  ) {
    await deleteUser(req, res);
  }
}

module.exports = adminController;
