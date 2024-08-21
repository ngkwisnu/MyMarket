import mongoose from "mongoose";

const categoryOutletSchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

categoryOutletSchema.pre("find", function () {
  this.where({ deleted_at: null });
});

categoryOutletSchema.pre("findOne", function () {
  this.where({ deleted_at: null });
});

const CategoryOutlet = mongoose.model("CategoryOutlet", categoryOutletSchema);

export default CategoryOutlet;
