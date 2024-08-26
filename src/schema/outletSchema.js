import Joi from "joi";

export const outletSchema = Joi.object({
  outlet_name: Joi.string().required(),
  outlet_address: Joi.string().required(),
  outlet_description: Joi.string().required(),
  outlet_status: Joi.string().required(),
  outlet_category: Joi.string().required(),
});
