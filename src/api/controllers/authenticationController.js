const {
  login,
  register,
  signToken,
} = require("../services/auth/authentication");
const { getPostData, throwError } = require("../utils");

//API authentication
async function authController(req, res) {
  if (req.url === "/api/auth/login" && req.method === "POST") {
    const { username, password } = await getPostData(req);
    try {
      const token = await login(username, password);

      const response = {
        status: "success",
        data: {
          user: username,
        },
        token,
      };
      res.statusCode = 200;
      res.end(JSON.stringify(response));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify(error));
    }
  } else if (req.url === "/api/auth/register" && req.method === "POST") {
    const { email, username, password } = await getPostData(req);
    if (await register(email, username, password)) {
      const response = {
        status: "success",
        data: {
          email: email,
          user: username,
        },
      };
      res.statusCode = 201;
      res.end(JSON.stringify(response));
    } else {
      res.statusCode = 400;
      const response = {
        status: "failed",
        message: "Registration failed",
      };
      res.end(JSON.stringify(response));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
}

module.exports = authController;
