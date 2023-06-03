const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkTokenMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== "undefined") {
    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1]; // Assuming the header is in 'Bearer <token>' format

    const secretKey = process.env.JWT_SECRET;

    try {
      const decodedToken = jwt.verify(token, secretKey);
      req.user = decodedToken; // Store the decoded token in the request object for later use
      next(); // Token is valid, continue to the next middleware or route handler
    } catch (error) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Token is invalid" }));
    }
  } else {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Token is missing" }));
  }
}

function checkAdminToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== "undefined") {
    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1]; // Assuming the header is in 'Bearer <token>' format
    const secretKey = process.env.JWT_SECRET;

    try {
      const decodedToken = jwt.verify(token, secretKey);
      req.user = decodedToken; // Store the decoded token in the request object for later use

      if (req.user.isAdmin) {
        // Token is valid and user has admin rights, continue to the next middleware or route handler
        next();
      } else {
        res.status(403).json({ error: "Access denied" });
      }
    } catch (error) {
      res.status(401).json({ error: "Token is invalid" });
    }
  } else {
    res.status(401).json({ error: "Token is missing" });
  }
}

module.exports = { checkTokenMiddleware, checkAdminToken };
