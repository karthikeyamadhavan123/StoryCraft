
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useNavigate()
  const params = useParams()
  const { token } = params
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/reset-password/${token}`,
        { password }
      );
      setPassword('')
      setConfirmPassword('')
      if (response.status === 200) {
        toast.success("Password reset successful!");
        setTimeout(() => {
          router('/api/login')
        }, 2000)
      }

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      
        <Helmet>
          <title>  Reset-password</title>
          <meta name='description' content="reset-password ,no worries" />
        </Helmet>
      
      <div className="bg-[#252241] min-h-screen min-w-screem flex justify-center items-center flex-col">

        <div className={`bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full font-merri`}>
          <div className="logo flex items-center justify-center mb-3">
            <img src="/logo.jpeg" alt="" className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded bg-gray-700 text-white outline-none focus:border-fuchsia-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-3 rounded bg-gray-700 text-white outline-none"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 p-3 rounded text-white font-bold"
            >
              Reset Password
            </button>
          </form>
          <ToastContainer position="top-right" />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
