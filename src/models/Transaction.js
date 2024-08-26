import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
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
      qty: {
        type: Number,
        required: true,
      },
      total_price: {
        type: Number,
        required: true,
      },
    },
  ],
  outlet: {
    type: String,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

transactionSchema.pre("find", function () {
  this.where({ deleted_at: null });
});

transactionSchema.pre("findOne", function () {
  this.where({ deleted_at: null });
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
