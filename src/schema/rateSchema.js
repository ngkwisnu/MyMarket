import Joi from "joi";

export const rateSchema = Joi.object({
  rating: Joi.number().required(),
  review: Joi.string().required(),
  image: [Joi.string().required()],
});
