import mongoose from "mongoose";
import { seedsCategoryOutlets } from "./CategoryOutlets.js";
import { seedsCategoryProducts } from "./CategoryProducts.js";

mongoose
  .connect("mongodb://127.0.0.1/marketplace")
  .then((result) => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const seedsData = async () => {
  seedsCategoryOutlets();
  seedsCategoryProducts();
};

seedsData();
