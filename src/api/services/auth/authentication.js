const { pool } = require("../../utils.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { throwError } = require("../../utils");

const signToken = (username) => {
  return jwt.sign({ username }, "Carina", {
    expiresIn: "30m",
  });
};
const register = async (email, username, password) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user record into the database
    const query =
      "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)";
    const values = [email, username, hashedPassword];
    await pool.query(query, values);
    console.log("User registered successfully");
    return true;
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
};

const login = async (username, password) => {
  try {
    // Retrieve the user record from the database
    const query = "SELECT * FROM users WHERE username = $1";
    const values = [username];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error("User does not exist");
    }

    // Compare the provided password with the hashed password in the database
    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Password is valid, login successful
      console.log("Login successful");
      return true;
    } else {
      // Password is invalid
      throw new Error("Password is invalid");
      return false;
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

module.exports = {
  register,
  login,
  signToken,
};
