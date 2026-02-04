import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import getToken from "../utils/token.js";

export const signUp = async (req, res) => {
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

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const token = await getToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "sign in error", err });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "signed out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "sign out error", err });
  }
};

export const sentOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();
    await sendOtpEmail(email, otp);
    return res.status(200).json({ message: "otp sent to email successfully" });
  } catch (err) {
    return res.status(500).json({ message: "send otp error", err });
  }
};

export const veryfyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "invalid or expired otp" });
    }

    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "otp verified successfully" });
  } catch (err) {
    return res.status(500).json({ message: "verify otp error", err });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "otp verified required" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "password reset successfully" });
  } catch (err) {
    return res.status(500).json({ message: "reset password error", err });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        fullName,
        email,
        mobile,
        role,
      });
    }

    const token = await getToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "google auth error", err });
  }
};
