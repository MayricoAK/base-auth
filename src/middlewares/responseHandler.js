const { StatusCodes } = require("http-status-codes");

// Middleware to format successful responses
exports.responseFormatter = (req, res, next) => {
  const oldJson = res.json;
  res.json = function (data) {
    const statusCode = res.statusCode || StatusCodes.OK;
    const isError = statusCode >= 400;
    const status = isError ? "error" : "success";

    const response = {
      status,
      statusCode,
      data: isError ? null : data,
      error: isError
        ? {
            message: data.details || data.error || res.error || null,
            details: data.message || res.statusMessage || "An error occurred",
          }
        : null,
      timestamp: new Date().toISOString(),
    };

    return oldJson.call(this, response);
  };
  next();
};

// 404 handler
exports.notFoundHandler = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: "API endpoint not found",
    details: `${req.method} ${req.originalUrl} is not a valid route`,
  });
};

// Error handling middleware
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    details: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
