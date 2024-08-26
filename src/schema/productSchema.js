import Joi from "joi";

export const productSchema = Joi.object({
  product_title: Joi.string().required(),
  product_price: Joi.number().required(),
  product_description: Joi.string().required(),
  product_image: Joi.string().required(),
  product_category: Joi.string().required(),
  product_status: Joi.string().required(),
  product_stock: Joi.number().required(),
  outlet: Joi.string().required(),
});
