import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["success", "failed"],
  },
  transaction_date: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
  total_amount: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
