import authSchema from "../schema/authSchema.js";
import { userSchema } from "../schema/userSchema.js";
import { validateOrder } from "../schema/orderSchema.js";
import { outletSchema } from "../schema/outletSchema.js";
import { productSchema } from "../schema/productSchema.js";
import { rateSchema } from "../schema/rateSchema.js";
import { likeSchema } from "../schema/likeSchema.js";
import { favoriteSchema } from "../schema/favoriteSchema.js";
import { groupCategorySchema } from "../schema/groupCategorySchema.js";
import {
  categoryOutletSchema,
  categoryProductSchema,
} from "../schema/categorySchema.js";
import { cartSchema } from "../schema/cartSchema.js";

const validateFormLogin = (req, res, next) => {
  const { error } = authSchema.loginSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    return res.status(400).json({
      status: 400,
      message: msg,
    });
  } else {
    return next();
  }
};

const validateFormRegister = (req, res, next) => {
  const { error } = authSchema.registerSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    return res.status(400).json({
      status: 400,
      message: msg,
    });
  } else {
    return next();
  }
};

const validateFormUser = (req, res, next) => {
  console.log(req.body);
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    return res.status(400).json({
      status: 400,
      message: msg,
    });
  }
  return next();
};

const validateFormOrder = (req, res, next) => {
  const { error } = validateOrder(req.body);
  if (error) {
    const msg = error.details.map((el) => el.msg).join(" ");
    return res.status(400).json({
      status: false,
      message: msg,
    });
  }
  return next();
};

const validateFormOutlet = (req, res, next) => {
  const { error } = outletSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    return res.status(400).json({
      status: false,
      message: msg,
    });
  }
  return next();
};

const validateFormProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    return res.status(400).json({
      status: false,
      message: msg,
    });
  }
  return next();
};

const validateFormRate = (req, res, next) => {
  const { error } = rateSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    return res.status(400).json({
      status: false,
      message: msg,
    });
  }
  return next();
};

const validateFormLike = (req, res, next) => {
  const { error } = likeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    return res.status(400).json({
      status: false,
      message: msg,
    });
  }
  return next();
};

const validateFormFavorite = (req, res, next) => {
  const { error } = favoriteSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    return res.status(400).json({
      status: false,
      message: msg,
    });
  }
  return next();
};

const validateFormGroup = (req, res, next) => {
  const { error } = groupCategorySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    return res.status(400).json({
      status: false,
      message: msg,
    });
  }
  return next();
};

const validateFormCategoryProduct = (req, res, next) => {
  const { error } = categoryProductSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    return res.status(400).json({
      status: false,
      message: msg,
    });
  }
  return next();
};

const validateFormCategoryOutlet = (req, res, next) => {
  const { error } = categoryOutletSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    return res.status(400).json({
      status: false,
      message: msg,
    });
  }
  return next();
};

const validateFormCart = (req, res, next) => {
  const { error } = cartSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    return res.status(400).json({
      status: false,
      message: msg,
    });
  }
  return next();
};

export default {
  validateFormCart,
  validateFormCategoryOutlet,
  validateFormCategoryProduct,
  validateFormGroup,
  validateFormFavorite,
  validateFormLogin,
  validateFormRegister,
  validateFormUser,
  validateFormOrder,
  validateFormOutlet,
  validateFormProduct,
  validateFormRate,
  validateFormLike,
};
