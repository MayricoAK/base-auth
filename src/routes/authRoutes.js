const express = require("express");
const authController = require("../controllers/authController");

const authRouter = express.Router();

// Register Route
authRouter.post("/register", authController.register);

// Login Route
authRouter.post("/login", authController.login);

module.exports = authRouter;
