import Thought from "../models/thought.model.js";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addThought = async (req, res) => {
  try {
    const { title, description, country = "", category } = req.body;

    // Validation
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and category are required",
      });
    }

    // Handle image upload if present
    let image = "";
    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path);
      image = uploaded?.secure_url || "";
    }

    // Find authenticated user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create thought
    const thought = await Thought.create({
      title,
      description,
      image,
      country,
      category,
      author: user._id,
    });

    // Add thought to user
    user.thoughts.push(thought._id);
    await user.save();

    // Populate user's thoughts
    await user.populate({
      path: "thoughts",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(201).json({
      success: true,
      message: "Thought created successfully",
      thought,
      user,
    });
  } catch (err) {
    console.error("Error in addThought:", err);
    return res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
    });
  }
};

export const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });

    if (!thoughts) {
      return res.status(404).json({ message: "No thoughts found" });
    }

    return res.status(200).json(thoughts);
  } catch (error) {
    return res.status(500).json({ message: `get thoughts error ${error}` });
  }
};
