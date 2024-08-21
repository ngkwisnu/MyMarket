import CategoryProduct from "../models/CategoryProduct.js";

export const seedsCategoryProducts = () => {
  CategoryProduct.insertMany([
    {
      category_name: "Smartphones",
    },
    {
      category_name: "Laptops",
    },
    {
      category_name: "Televisions",
    },
    {
      category_name: "Cameras",
    },
    {
      category_name: "Women's Clothing",
    },
    {
      category_name: "Men's Clothing",
    },
    {
      category_name: "Footwear",
    },
    {
      category_name: "Kitchen Appliances",
    },
    {
      category_name: "Laundry Appliances",
    },
    {
      category_name: "Skincare",
    },
  ]);
};
