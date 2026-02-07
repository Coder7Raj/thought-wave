import mongoose from "mongoose";

const categories = [
  "Life",
  "Technology",
  "Programming",
  "Career",
  "Motivation",
  "Personal Growth",
  "Education",
  "Health",
  "Travel",
  "Opinions",
];

const thoughtSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: categories,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

thoughtSchema.index({ createdAt: -1 });
thoughtSchema.index({ likes: -1 });

const Thought = mongoose.model("Thought", thoughtSchema);

export default Thought;
