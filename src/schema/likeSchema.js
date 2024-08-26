import Joi from "joi";

export const likeSchema = Joi.object({
  user: Joi.string().required(),
  product: Joi.string().required(),
});
