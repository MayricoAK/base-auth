const pool = require("../config/db");

const User = {
  async create(userData) {
    try {
      const [result] = await pool.execute(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [
          userData.name,
          userData.email,
          userData.password,
          userData.role || "user",
        ]
      );
      return result.insertId;
    } catch (error) {
      throw new Error("Unable to create user");
    }
  },

  async findByEmail(email) {
    try {
      const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows[0] || null;
    } catch (error) {
      throw new Error("Unable to find user by email");
    }
  },
};

module.exports = User;
