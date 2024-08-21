import mongoose from "mongoose";
import CategoryOutlet from "../models/CategoryOutlet.js";

mongoose
  .connect("mongodb://127.0.0.1/marketplace")
  .then((result) => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

export const seedsCategoryOutlets = () => {
  CategoryOutlet.insertMany([
    {
      category_name: "Electronics",
    },
    {
      category_name: "Clothing and Accessories",
    },
    {
      category_name: "Home Appliances",
    },
    {
      category_name: "Beauty and Personal Care",
    },
    {
      category_name: "Food and Beverages",
    },
    {
      category_name: "Sports and Outdoor",
    },
    {
      category_name: "Automotive",
    },
    {
      category_name: "Toys and Hobbies",
    },
    {
      category_name: "Books and Stationery",
    },
    {
      category_name: "Health Products",
    },
  ]);
};
