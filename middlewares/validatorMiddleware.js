//Import express-validator
const { validationResult } = require('express-validator');
//Middleware to catch errors from rules if exist
//@desc  Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Export validatorMiddleware to use it in utils in  validator in categoryValidator
module.exports = validatorMiddleware;