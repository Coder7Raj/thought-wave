import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import getToken from "../utils/token.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters" });
    }

    if (mobile.length < 11) {
      return res
        .status(400)
        .json({ message: "mobile must be at least 11 digits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      role,
    });

    await user.save();
    const token = await getToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: "sign up error", err });
  }
};
