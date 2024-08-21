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
      product_id: {
        type: String,
        required: true,
      },
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
      },
      total_price: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      outlet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Outlet",
      },
    },
  ],
  total_amount: {
    type: Number,
    required: true,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
