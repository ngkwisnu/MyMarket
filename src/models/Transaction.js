import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
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
      product_outlet: {
        type: String,
        required: true,
      },
      product_quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
