import Joi from 'joi';

const schemaProduct = Joi.object({
  productsIds: Joi.array().required().min(1).items(Joi.number())
    .messages({
      'any.required': '"productsIds" is required',
      'array.empty': '"productsIds" is required',
      'array.min': '"productsIds" must include only numbers',
    }),
});

export default schemaProduct;