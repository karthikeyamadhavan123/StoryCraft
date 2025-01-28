
import  { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://storycraft-backend.onrender.com/api/forgot-password", { email });
      if (response.status === 200) {
        toast.success("Password reset link sent to your email.");
        setEmail("");
      } else {
        toast.error("Failed to send reset link.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title> Forgot-password |Storycraft</title>
        <meta name='description' content="Forgot-password ,no worries" />
      </Helmet>
      <div className={`flex justify-center items-center min-h-screen bg-gray-900 font-merri`}>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Forgot Password</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <Mail size={16} className="absolute top-4 left-3 text-white" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 w-full p-3 pl-10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg text-white font-bold"
              disabled={loading}
            >
              {loading ? <ClipLoader color="white" size={20} /> : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-4 text-white flex items-center justify-center gap-2">
            <ArrowLeft size={16} className="text-purple-500" />
            <Link to="/api/login" className="text-purple-500 font-bold hover:underline">
              Back to Login
            </Link>
          </div>

          <ToastContainer position="top-right" />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
