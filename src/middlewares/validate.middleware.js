const httpStatus = require("http-status");

const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json(error);
  } else {
    next();
  }
}
  
module.exports = { validateSchema };
  