const { pool } = require("../../utils");
const getUsers = async (req, res) => {
  await pool.query("SELECT id, username FROM users", (error, results) => {
    if (error) {
      console.error("Error retrieving users:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "An internal server error occurred" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(results.rows)); // Return the user data as JSON response
    }
  });
};

const deleteUser = async (req, res) => {
  const id = req.url.split("/")[4];
  try {
    const query = "DELETE FROM users WHERE id = $1"; // Replace 'users' with your actual table name

    // Execute the DELETE query with the user's ID as a parameter
    const results = await pool.query(query, [id]);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results.rows)); // Return the user data as JSON response
  } catch (error) {
    console.error("Error deleting user:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "An internal server error occurred" }));
  }
};

// const updateUser = async (req, res) => {};

module.exports = {
  getUsers,
  deleteUser,
};
