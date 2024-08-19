import jwt from "jsonwebtoken";

export const tokenVerify = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  token = token.split(" ").splice(1).join();
  console.log(token);
  jwt.verify(token, process.env.ACCESS_KEY_SECRET, function (err, decode) {
    if (err) return res.sendStatus(401);
    return next();
  });
};
