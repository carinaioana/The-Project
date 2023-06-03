const { pool } = require("../../utils.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { throwError } = require("../../utils");
const { sign } = require("jsonwebtoken");

const signToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      isAdmin: user.admin_rights,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30m",
    }
  );
};

const register = async (email, username, password) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert the user record into the database
    const query =
      "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)";
    const values = [email, username, hashedPassword];
    await pool.query(query, values);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const login = async (username, password) => {
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
    const token = signToken(user);
    // Password is valid, login successful
    console.log("Login successful");
    return token;
  } else {
    // Password is invalid
    throw new Error("Password is invalid");
  }
};

module.exports = {
  register,
  login,
  signToken,
};
