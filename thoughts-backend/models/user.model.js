import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: String,

    mobile: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },

    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    resetOtp: String,

    isOtpVerified: {
      type: Boolean,
      default: false,
    },

    otpExpires: Date,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
