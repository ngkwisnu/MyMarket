import authSchema from "../schema/authSchema.js";
import { userSchema } from "../schema/userSchema.js";

const validateFormLogin = async (req, res, next) => {
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

const validateFormRegister = async (req, res, next) => {
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

const validateFormUser = async (req, res, next) => {
  console.log(req.body);
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    return res.status(400).json({
      status: 400,
      message: msg,
    });
  }
  next();
};

export default { validateFormLogin, validateFormRegister, validateFormUser };
