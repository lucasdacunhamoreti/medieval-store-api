import Joi from 'joi';

const schemaUser = Joi.object({
  username: Joi.string().min(3).required().messages({
    'any.required': '"username" is required',
    'string.empty': '"username" is required',
    'string.min': '"username" length must be at least 3 characters long',
  }),
  classe: Joi.string().min(3).required().messages({
    'any.required': '"classe" is required',
    'string.empty': '"classe" is required',
    'string.min': '"classe" length must be at least 3 characters long',
  }),
  level: Joi.number().min(1).required().messages({
    'any.required': '"level" is required',
    'number.empty': '"level" is required',
    'number.min': '"level" must be greater than or equal to 1',
  }),
  password: Joi.string().min(8).required().messages({
    'any.required': '"password" is required',
    'string.empty': '"password" is required',
    'string.min': '"password" length must be at least 8 characters long',
  }),
});

export default schemaUser;