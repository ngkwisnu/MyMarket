import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_title: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
      required: true,
    },
    product_category: {
      type: String,
      required: true,
      enum: [
        "Furniture",
        "decor",
        "kitchenware",
        "Accessories",
        "Clothing",
        "Pants",
        "Shoes",
        "Bags",
        "Jackets",
        "Toys",
        "collectibles",
        "games",
        "Food",
        "beverages",
      ],
    },
    product_status: {
      type: String,
      required: true,
      enum: ["active", "non-active"],
    },
    product_stock: {
      type: Number,
      required: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    favorite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    outlet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outlet",
    },
    rates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rate",
      },
    ],
  },
  { timestamps: true }
);

productSchema.pre("find", function () {
  this.where({ deleted_at: null });
});

productSchema.pre("findOne", function () {
  this.where({ deleted_at: null });
});

const Product = mongoose.model("Product", productSchema);

export default Product;
