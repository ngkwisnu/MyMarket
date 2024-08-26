import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

cartSchema.pre("find", function () {
  this.where({ deleted_at: null });
});

cartSchema.pre("findOne", function () {
  this.where({ deleted_at: null });
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
