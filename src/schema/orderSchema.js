import Joi from "joi";

export const validateOrder = Joi.object({
  address: Joi.string().required(),
  products: [
    {
      product_id: Joi.string().required(),
      qty: Joi.number().required(),
    },
  ],
});
