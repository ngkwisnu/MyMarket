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
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryOutlet",
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

outletSchema.pre("find", function () {
  this.where({ deleted_at: null });
});

outletSchema.pre("findOne", function () {
  this.where({ deleted_at: null });
});

const Outlet = mongoose.model("Outlet", outletSchema);

export default Outlet;
