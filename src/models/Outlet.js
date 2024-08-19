import mongoose from "mongoose";

const outletSchema = new mongoose.Schema(
  {
    outlet_name: {
      type: String,
      required: true,
    },
    outlet_description: {
      type: String,
      required: true,
    },
    outlet_address: {
      type: String,
      required: true,
    },
    outlet_status: {
      type: String,
      required: true,
      enum: ["active", "non-active"],
    },
    outlet_category: {
      type: String,
      required: true,
      enum: [
        "Fashion",
        "Electronics",
        "Home & Living",
        "Health & Beauty",
        "Toys & Hobbies",
        "Groceries",
      ],
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    mall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mall",
    },
  },
  { timestamps: true }
);

const Outlet = mongoose.model("Outlet", outletSchema);

export default Outlet;
