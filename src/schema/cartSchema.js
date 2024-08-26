import Joi from "joi";

export const cartSchema = Joi.object({
  user: Joi.string().required(),
  products: [
    {
      product: Joi.string().required(),
      quantity: Joi.number().required(),
    },
  ],
});
