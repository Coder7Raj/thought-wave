import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { serveruri } from "../App";
import { auth } from "../firebase";
import { setUserData } from "../redux/user.slice";

export default function Signin() {
  const primaryColor = "#ff4d2d";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${serveruri}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log("result", result);
      toast.success("Signin successful!"); // show success toast
    } catch (error) {
      toast.error(error.response?.data?.message || "SignIn failed");
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serveruri}/api/auth/google_auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true },
      );
      dispatch(setUserData(data));
      toast.success("Google sign-in successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google sign-in failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border"
        style={{ borderColor: borderColor }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          thought wave
        </h1>
        <p className="text-gray-600 mb-8">
          Sign In with an account to get started with our thought sharing
          platform.
        </p>
        {/* form */}

        {/* email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            placeholder="Enter your email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* password */}
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 pr-10"
            placeholder="Enter your password"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
          <div className="text-right mb-4">
            <Link
              to="/forgot_password"
              className="text-right text-sm text-[#ff4d2d] font-medium transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <button
          onClick={handleSignIn}
          className="w-full font-semibold text-white rounded-lg py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer"
        >
          Sign In
        </button>
        <p className="text-center">or</p>
        <button
          onClick={handleGoogleAuth}
          className="flex items-center justify-center border gap-2 w-full font-semibold text-black rounded-lg py-2 transition duration-200 hover:bg-gray-200 cursor-pointer"
        >
          <FcGoogle size={20} /> Sign In with Google
        </button>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Don't have an account?
          <Link
            to="/signup"
            className="text-[#ff4d2d] font-medium transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
