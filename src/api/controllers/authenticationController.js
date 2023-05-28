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
      if (await login(username, password)) {
        const token = signToken(username);
        const response = {
          status: "success",
          data: {
            user: username,
          },
          token,
        };
        res.statusCode = 200;
        res.end(JSON.stringify(response));
      } else throw new Error("Login Failed");
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify(error));
    }
  } else if (req.url === "/api/auth/register" && req.method === "POST") {
    const { email, username, password } = await getPostData(req);
    try {
      if (await register(email, username, password)) {
        const token = signToken(username);
        const response = {
          status: "success",
          data: {
            email: email,
            user: username,
          },
          token,
        };
        res.statusCode = 201;
        res.end(JSON.stringify(response));
      } else throw new Error("Registration failed");
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify(error));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
}

module.exports = authController;
