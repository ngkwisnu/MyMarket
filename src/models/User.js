import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      default: null,
    },
    refresh_token: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "super-admin", "customer"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["active", "non-active"],
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("find", function () {
  this.where({ deleted_at: null });
});

userSchema.pre("findOne", function () {
  this.where({ deleted_at: null });
});

const User = mongoose.model("User", userSchema);

export default User;
