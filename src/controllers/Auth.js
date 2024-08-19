import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const register = async (req, res) => {
  try {
    if (!req.body) return res.sendStatus(400);
    let { username, email, password } = req.body;
    password = await bcrypt.hash(password, 12);
    const user = new User({
      username: username,
      password: password,
      email: email,
    });
    const result = await user.save();
    if (!result) return res.sendStatus(400);
    res.status(200).json({
      status: 200,
      message: "Register berhasil!",
    });
  } catch (error) {
    res.status(200).json({
      status: 200,
      message: error,
    });
  }
};

const login = async (req, res) => {
  if (!req.body) return res.sendStatus(401);
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) return res.sendStatus(404);
  const result = bcrypt.compare(password, user.password);
  if (result) {
    const payload = {
      username: user.username,
      password: user.password,
      email: user.email,
    };
    const access_key = jwt.sign(payload, process.env.ACCESS_KEY_SECRET, {
      expiresIn: "40s",
    });
    const refresh_key = jwt.sign(payload, process.env.REFRESH_KEY_SECRET, {
      expiresIn: "1d",
    });
    await User.findByIdAndUpdate(user.id, { refresh_token: refresh_key });
    return res
      .status(200)
      .cookie("refresh_key", refresh_key)
      .json({
        status: 200,
        message: `Login Berhasil`,
        token: `Bearer ${access_key}`,
      });
  }
  res.status(401).json({
    status: 401,
    message: "Login failed!",
  });
};

const refreshToken = async (req, res) => {
  const refresh_key = req.cookies.refresh_key;
  const user = await User.findOne({ refresh_token: refresh_key });
  const payload = {
    username: user.username,
    password: user.password,
    email: user.email,
  };
  console.log(refresh_key);
  jwt.verify(
    refresh_key,
    process.env.REFRESH_KEY_SECRET,
    function (err, decode) {
      if (err) return res.sendStatus(403);
      const access_key = jwt.sign(payload, process.env.ACCESS_KEY_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).json({
        status: 200,
        message: "Get token",
        token: access_key,
      });
    }
  );
};

const logout = async (req, res) => {
  const refresh_key = req.cookies.refresh_key;
  if (!refresh_key) return res.sendStatus(403);
  const user = await User.findOneAndUpdate(
    { refresh_token: refresh_key },
    { $set: { refresh_token: null } }
  );
  if (!user) return res.sendStatus(403);
  await user.save();
  res.clearCookie("refresh_key");
  res.status(200).json({
    status: 200,
    message: "Berhasil logout!",
  });
};

export default { register, login, refreshToken, logout };
