import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serveruri } from "../App.jsx";

export default function ForgotPass() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handler functions can be added here for form submissions
  const handleSendOTP = async () => {
    // Logic to send OTP to the provided email
    try {
      const result = await axios.post(
        `${serveruri}/api/auth/send_otp`,
        { email },
        { withCredentials: true },
      );
      toast.success("OTP sent to your email!");
      console.log(" result", result);
      setStep(2); // Move to OTP verification step
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };
  // Handle OTP verification
  const handleVerifyOTP = async () => {
    // Logic to verify the OTP
    try {
      const result = await axios.post(
        `${serveruri}/api/auth/verify_otp`,
        { email, otp },
        { withCredentials: true },
      );
      toast.success("OTP verified successfully!");
      console.log(" result", result);
      setStep(3); // Move to password reset step
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify OTP");
    }
  };
  // Handle password reset
  const handleResetPassword = async () => {
    if (newPassword != confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    // Logic to reset the password
    try {
      const result = await axios.post(
        `${serveruri}/api/auth/reset_password`,
        { email, newPassword },
        { withCredentials: true },
      );
      toast.success("Password reset successful!");
      console.log(" result", result);
      navigate("/signin"); // Redirect to sign-in page after successful password reset
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#fff9f6]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center gap-2">
          <FaArrowLeftLong
            size={20}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>
        {/* Step 1: Email Input */}
        {step === 1 && (
          <>
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
                style={{ border: `1px solid #ddd` }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              onClick={handleSendOTP}
              className="w-full font-semibold text-white rounded-lg py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer"
            >
              Send OTP
            </button>
          </>
        )}
        {/* Step 2: OTP Input */}
        {step === 2 && (
          <>
            <div className="mb-4 relative">
              <label
                htmlFor="OTP"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type={showOTP ? "text" : "password"}
                className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-orange-500"
                placeholder="Enter the OTP"
                style={{ border: `1px solid #ddd` }}
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
              <span
                onClick={() => setShowOTP((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                title={showOTP ? "Hide OTP" : "Show OTP"}
              >
                {showOTP ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
            <button
              onClick={handleVerifyOTP}
              className="w-full font-semibold text-white rounded-lg py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer"
            >
              Verify OTP
            </button>
          </>
        )}
        {/* Step 2: OTP Input */}
        {step === 3 && (
          <>
            <div className="mb-4 relative">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type={newPassword ? "text" : "password"}
                className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-orange-500"
                placeholder="Enter your new password"
                style={{ border: `1px solid #ddd` }}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
              <span
                onClick={() => setNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                title={newPassword ? "Hide Password" : "Show Password"}
              >
                {newPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type={confirmPassword ? "text" : "password"}
                className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-orange-500"
                placeholder="Enter your confirm password"
                style={{ border: `1px solid #ddd` }}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <span
                onClick={() => setShowOTP((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                title={
                  confirmPassword
                    ? "Hide Confirm Password"
                    : "Show Confirm Password"
                }
              >
                {confirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
            <button
              onClick={handleResetPassword}
              className="w-full font-semibold text-white rounded-lg py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
