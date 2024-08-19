import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import Auth from "./routes/Auth.js";
import User from "./routes/User.js";
import Mall from "./routes/Mall.js";
import { tokenVerify } from "./middleware/tokenVerify.js";

const app = express();
dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1/marketplace")
  .then((result) => {
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", Auth);
app.use("/user", User);
app.use("/mall", Mall);

app.get("/", tokenVerify, (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Hello World!",
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server listen on http://${process.env.HOST}:${process.env.PORT}`
  );
});
