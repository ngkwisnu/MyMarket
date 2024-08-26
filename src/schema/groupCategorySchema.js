import Joi from "joi";

export const groupCategorySchema = Joi.object({
  name: Joi.string().required(),
  products: [Joi.string().required()],
});
