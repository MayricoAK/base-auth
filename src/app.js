const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRouter = require("./routes/authRoutes");
const {
  responseFormatter,
  notFoundHandler,
  errorHandler,
} = require("./middlewares/responseHandler");

const app = express();

const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(cors({ origin: frontendURL }));

app.use(express.json());
app.use(helmet());

// Middleware for logging
app.use(morgan("common"));

// Apply response formatter
app.use(responseFormatter);

// Routes
app.get("/", (req, res) => {
  res.send(`<h1>SERVER IS RUNNING! 🚀</h1>`);
});
app.use("/auth", authRouter);

// 404 handler for undefined routes
app.use(notFoundHandler);

module.exports = app;
