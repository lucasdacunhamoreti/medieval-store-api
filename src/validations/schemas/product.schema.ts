import Joi from 'joi';

const schemaProduct = Joi.object({
  name: Joi.string().min(3).required().messages({
    'any.required': '"name" is required',
    'string.empty': '"name" is required',
    'string.min': '"name" length must be at least 3 characters long',
  }),
  amount: Joi.string().min(3).required().messages({
    'any.required': '"amount" is required',
    'string.empty': '"amount" is required',
    'string.min': '"amount" length must be at least 3 characters long',
  }),
});

export default schemaProduct;