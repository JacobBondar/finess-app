const { messages, errorResponse } = require('../utils/hebrewResponses');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error:', err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json(errorResponse(messages.general.invalidId));
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    if (field === 'email') {
      return res.status(400).json(errorResponse(messages.auth.userExists));
    }
    return res.status(400).json(errorResponse(`שדה ${field} כבר קיים במערכת`));
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json(errorResponse(errors.join(', ')));
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json(errorResponse(messages.auth.tokenInvalid));
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json(errorResponse(messages.auth.tokenExpired));
  }

  // Default error
  res.status(error.statusCode || 500).json(
    errorResponse(error.message || messages.general.serverError)
  );
};

// Not found handler
const notFound = (req, res, next) => {
  res.status(404).json(errorResponse(messages.general.notFound));
};

module.exports = { errorHandler, notFound };
