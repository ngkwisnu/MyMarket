// Package
import express from "express";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Route
import Auth from "./routes/Auth.js";
import User from "./routes/User.js";
import Outlet from "./routes/Outlet.js";
import CategoryOutlet from "./routes/CategoryOutlet.js";
import CategoryProduct from "./routes/CategoryProduct.js";
import Product from "./routes/Product.js";
import Order from "./routes/Order.js";
import Cart from "./routes/Cart.js";

// Middleware
import { tokenVerify } from "./middleware/tokenVerify.js";

// Declare
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const app = express();
const images_dir = path.join(_dirname, "..", "public/images");
dotenv.config();

// Database
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
app.use("/outlet", Outlet);
app.use("/product", Product);
app.use("/order", Order);
app.use("/cart", Cart);
app.use("/category-product", CategoryProduct);
app.use("/category-outlet", CategoryOutlet);
app.use("/files", express.static(images_dir));

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
