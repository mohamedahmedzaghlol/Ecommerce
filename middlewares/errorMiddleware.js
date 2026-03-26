//const { stack } = require("../routes/categoryRoute");

const globalError = (err,req,res,next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV == "development") {
    // eslint-disable-next-line no-use-before-define
    sendErrorForDev(err,res);
  } else {
    // eslint-disable-next-line no-use-before-define
    sendErrorForProd(err,res);
  }
};

//Node_ENV=development
const sendErrorForDev = (err,res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

//Node_ENV=production
const sendErrorForProd = (err,res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

module.exports = globalError;