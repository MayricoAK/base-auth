const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;
const EXP_TIME = process.env.JWT_EXP_TIME || "1h";

exports.registerUser = async (name, email, password, role) => {
  const existingUser = await User.findByEmail(email);
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashedPassword, role });
};

exports.loginUser = async (email, password) => {
  const user = await User.findByEmail(email);
  if (!user) throw new Error("User not found");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: EXP_TIME,
  });
  return {
    token,
    user: { name: user.name, email: user.email, role: user.role },
  };
};
