import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { sendOtpEmail } from "../utils/mail.js";
import getToken from "../utils/token.js";

export const signUp = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      password,
      role,
      country = "",
      city = "",
      state = "",
      address = "",
    } = req.body;

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

    // ✅ Include location fields
    user = new User({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      role,
      country,
      city,
      state,
      address,
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

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
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
    return res.status(200).json({
      success: true,
      message: "signed out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "sign out error",
    });
  }
};

export const sendOtp = async (req, res) => {
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
    // console.error("SEND OTP ERROR:", err);
    return res.status(500).json({ message: "send otp error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "invalid or expired otp" });
    }

    user.resetOtp = undefined;
    user.otpExpires = undefined;
    user.isOtpVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "otp verified successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "verify otp error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerified) {
      return res.status(400).json({
        success: false,
        message: "otp verification required",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "password reset successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "reset password error",
    });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName,
        email,
        authProvider: "google",
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
