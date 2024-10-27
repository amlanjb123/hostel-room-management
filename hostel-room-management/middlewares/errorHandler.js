// errorHandler.js

/**
 * Error handling middleware for Express.
 * Catches errors from routes and controllers and sends a consistent error response.
 */
const errorHandler = (err, req, res, next) => {
    // Determine the status code (default to 500 if none is set)
    const statusCode = res.statusCode === 200 ? (err.status || 500) : res.statusCode;
    
    // Log the error for debugging
    console.error(`[Error]: ${err.message}`);
  
    // Send JSON response with error details
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack in production
    });
  };
  
  module.exports = errorHandler;
  