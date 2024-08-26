import Joi from "joi";

export const favoriteSchema = Joi.object({
  user: Joi.string().required(),
  products: Joi.string().required(),
});
