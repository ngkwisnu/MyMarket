import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  role: Joi.string().required(),
});
