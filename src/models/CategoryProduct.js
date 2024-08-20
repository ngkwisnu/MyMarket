import mongoose from "mongoose";

const categoryProductSchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const CategoryProduct = mongoose.model(
  "CategoryProduct",
  categoryProductSchema
);

export default CategoryProduct;
