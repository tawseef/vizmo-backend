const Joi = require("joi");

const blogValidation = Joi.object().keys({
  title: Joi.string().required().max(150),
  author: Joi.string().required(),
  content: Joi.string().default(""),
});


const contentValidation = Joi.object().keys({
  author: Joi.string().required(),
  content: Joi.string().required()
});

module.exports =  { blogValidation, contentValidation } 
