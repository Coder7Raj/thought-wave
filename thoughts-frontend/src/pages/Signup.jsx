import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { serveruri } from "../App";
import { auth } from "../firebase";
import { setUserData } from "../redux/user.slice";

export default function Signup() {
  const primaryColor = "#ff4d2d";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const result = await axios.post(
        `${serveruri}/api/auth/signup`,
        {
          fullName,
          email,
          mobile,
          password,
          role,
        },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
      console.log("result", result);
      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const handleGoogleAuth = async () => {
    if (!mobile) {
      return toast.error("Mobile number required!");
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serveruri}/api/auth/google_auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          mobile,
          role,
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
    <>
      <section>
        <div className="min-h-screen flex items-center justify-center p-2">
          <div
            className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border"
            style={{ borderColor: borderColor }}
          >
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: primaryColor }}
            >
              thought wave
            </h1>
            <p className="text-gray-600 mb-8">
              Create an account to get started with our latest thought sharing
              platform!
            </p>
            {/* form */}
            {/* name */}
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-medium mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter your full name"
                style={{ border: `1px solid ${borderColor}` }}
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                required
              />
            </div>
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
            {/* mobile */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Mobile
              </label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter your mobile number"
                style={{ border: `1px solid ${borderColor}` }}
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
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
            </div>
            {/* role */}
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-gray-700 font-medium mb-1"
              >
                Role
              </label>

              <div className="flex gap-2">
                {["user", "owner"].map((r, index) => (
                  <button
                    key={index}
                    onClick={() => setRole(r)}
                    style={
                      role == r
                        ? { backgroundColor: primaryColor, color: "white" }
                        : { border: `1px solid ${borderColor}`, color: "#333" }
                    }
                    className="flex-1 cursor-pointer border rounded-lg px-3 py-2 text-center font-medium transition-colors"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleSignUp()}
              className="w-full font-semibold text-white rounded-lg py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer"
            >
              Sign Up
            </button>
            <p className="text-center">or</p>
            <button
              onClick={handleGoogleAuth}
              className="flex items-center justify-center border gap-2 w-full font-semibold text-black rounded-lg py-2 transition duration-200 hover:bg-gray-200 cursor-pointer"
            >
              <FcGoogle size={20} /> Sign Up with Google
            </button>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Already have an account?
              <Link
                to="/signin"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
            {/* <p className="text-red-500 text-center">{error}</p> */}
          </div>
        </div>
      </section>
    </>
  );
}
