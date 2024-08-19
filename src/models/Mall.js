import mongoose from "mongoose";

const mallSchema = new mongoose.Schema(
  {
    mall_name: {
      type: String,
      required: true,
    },
    mall_address: {
      type: String,
      required: true,
    },
    mall_description: {
      type: String,
      required: true,
    },
    mall_status: {
      type: String,
      enum: ["active", "non-active"],
    },
    mall_image: {
      type: String,
      default: null,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    outlets: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outlet",
    },
  },
  { timestamps: true }
);

const Mall = mongoose.model("Mall", mallSchema);

export default Mall;
