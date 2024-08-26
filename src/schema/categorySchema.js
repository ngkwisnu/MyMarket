import Joi from "joi";

const categoryProductSchema = Joi.object({
  category_name: Joi.string().required(),
});

const categoryOutletSchema = Joi.object({
  category_name: Joi.string().required(),
});

export { categoryOutletSchema, categoryProductSchema };
