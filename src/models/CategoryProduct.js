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

categoryProductSchema.pre("find", function () {
  this.where({ deleted_at: null });
});

categoryProductSchema.pre("findOne", function () {
  this.where({ deleted_at: null });
});

const CategoryProduct = mongoose.model(
  "CategoryProduct",
  categoryProductSchema
);

export default CategoryProduct;
