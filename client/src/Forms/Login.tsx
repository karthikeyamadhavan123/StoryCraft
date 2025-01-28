
import React, { useState } from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import {useAuthStore} from "@/zustand/zustand";
import { useNavigate } from 'react-router-dom';
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { loginUser } = useAuthStore()
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setLoading(true)
      e.preventDefault();
      const response = await axios.post("http://localhost:8080/api/login", { email, password }, { withCredentials: true });
      if (response.status === 200) {
        const { username, userId } = response.data
        loginUser(username, userId)
        const date = new Date()
        const hours = date.getHours()
        localStorage.setItem('l_time',hours.toString())
        toast.success(response.data.message)
        setTimeout(() => {
          navigate('/project')
        }, 2000)
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.response.data.message)
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <><Helmet>
      <title>Login to StoryCraft</title>
      <meta name='description' content="Register" />
    </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-black font-merri">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 text-white rounded-lg shadow-md">
          <img src="../logo.jpeg" alt="" className='w-20 h-20 text-center m-auto' />
          <h2 className="text-2xl font-bold text-center ">Login To Storycraft</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium ">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-sm border-2 border-gray-400 rounded-lg focus:outline-none bg-gray-900"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-sm  rounded-lg focus:outline-none border-2 border-gray-400 bg-gray-900"
                placeholder="Enter your password"
                required
              />
              <div className="mt-2 text-right">
                <a href="/api/forgot-password" className="text-sm text-purple-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>
            {
              loading ? <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:ease-in-out"
              >
                <ClipLoader size={20} />:
              </button> : <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:ease-in-out"
              >
                Login To Your Account
              </button>
            }

          </form>
          <p className="text-sm text-center text-gray-300">
            Don't have an account?{' '}
            <a href="/api/register" className="text-purple-500 hover:underline">
              Sign Up Here
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
