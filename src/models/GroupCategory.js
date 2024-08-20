import mongoose from "mongoose";

const groupCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const GroupCategory = mongoose.model("GroupCategory", groupCategory);

export default GroupCategory;
