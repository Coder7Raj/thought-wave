import Thought from "../models/thought.model.js";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addThought = async (req, res) => {
  try {
    const { title, description, country, category } = req.body;

    let image = "";

    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path);
      image = uploaded?.secure_url;
    }

    // Find logged in user
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

    // Push thought into user
    user.thoughts.push(thought._id);
    await user.save();

    // Populate thoughts
    await user.populate({
      path: "thoughts",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(201).json({
      success: true,
      message: "Thought created successfully",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error adding thought: ${err.message}`,
    });
  }
};
