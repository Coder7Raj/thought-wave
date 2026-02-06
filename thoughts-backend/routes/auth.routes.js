import express from "express";
import {
  googleAuth,
  resetPassword,
  sendOtp,
  signIn,
  signOut,
  signUp,
  verifyOtp,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signOut);
authRouter.post("/google_auth", googleAuth);
authRouter.post("/send_otp", sendOtp);
authRouter.post("/verify_otp", verifyOtp);
authRouter.post("/reset_password", resetPassword);

export default authRouter;
