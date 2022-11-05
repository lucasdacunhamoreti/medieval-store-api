import Joi from 'joi';

const schemaLogin = Joi.object({
  username: Joi.string().required().messages({
    'any.required': '"username" is required',
    'string.empty': '"username" is required',
  }),
  password: Joi.string().required().messages({
    'any.required': '"password" is required',
    'string.empty': '"password" is required',
  }),
});

export default schemaLogin;