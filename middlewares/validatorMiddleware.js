const { validationResult } = require('express-validator');

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array()[0].msg;
    const error = new Error(errorMsg);
    error.statusCode = 400;
    error.status = 'fail';
    
    return next(error); 
  }
  next();
};

module.exports = validatorMiddleware;