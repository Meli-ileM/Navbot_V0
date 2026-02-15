import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Number,
      enum: [0, 1],
      default: 0, // 0 = user, 1 = admin
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
