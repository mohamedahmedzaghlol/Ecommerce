//@desc this class is responsible about Operational Errors (Errors that I can Predict)
class ApiError extends Error {
  constructor(message,statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `$statusCode`.startsWith(4)? "fail" : "error";
    this.isOperational = true;
  }
}

module.exports = ApiError;