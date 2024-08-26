import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const tokenVerify = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  token = token.split(" ").splice(1).join();
  console.log(token);
  jwt.verify(
    token,
    process.env.ACCESS_KEY_SECRET,
    async function (err, decode) {
      if (err) return res.sendStatus(401);
      const user = await User.findOne({ _id: decode.id });
      if (!user) return res.status(404).json({ message: "User not found!" });
      req.user = decode;
      return next();
    }
  );
};
