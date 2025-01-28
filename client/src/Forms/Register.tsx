import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import {useAuthStore} from "@/zustand/zustand";
interface FormData {
  username: string;
  email: string;
  password: string;
  preferences: string;
}

interface FormErrors {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate()
  const { registerUser } = useAuthStore()
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    preferences: ""
  });
  const [loading, setLoading] = useState(false)

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    password: "",
  });

  const preferences = ["Fantasy", "Sci-Fi", "Mystery", "Romance", "Horror", "Non-Fiction"] as const;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreferenceChange = (preference: string) => {
    const currentPreferences = formData.preferences ? formData.preferences.split(',') : [];
    let newPreferences;

    if (currentPreferences.includes(preference)) {
      newPreferences = currentPreferences.filter(p => p !== preference);
    } else {
      newPreferences = [...currentPreferences, preference];
    }

    setFormData(prev => ({
      ...prev,
      preferences: newPreferences.join(',')
    }));
  };

  const validateStep1 = (): boolean => {
    const newErrors = { username: "", email: "", password: "" };
    if (!formData.username.trim()) newErrors.username = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return !newErrors.username && !newErrors.email && !newErrors.password;
  };

  const handleStep1Submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleFinalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post("https://storycraft-backend.onrender.com/api/register", formData, { withCredentials: true });
      if (response.status === 201) {
        const { username, userId } = response.data
        registerUser(username, userId)
        const date = new Date()
        const hours = date.getHours()
        localStorage.setItem('r_time',hours.toString())
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
    <>
      <Helmet>
        <title>Regsiter to StoryCraft</title>
        <meta name='description' content="Register" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-merri">
        <div className="w-full max-w-md bg-gray-900 shadow-lg rounded-lg p-6">
          <div className="flex justify-between mb-6">
            <p className={`font-bold ${step === 1 ? "text-purple-400" : "text-gray-400"}`}>Step 1</p>
            <p className={`font-bold ${step === 2 ? "text-purple-400" : "text-gray-400"}`}>Step 2</p>
          </div>

          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                {errors.username && <p className="text-red-400 text-sm">{errors.username}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-500 py-2 px-4 rounded-lg hover:bg-purple-600 transition"
              >
                Next
              </button>
              <div className="text-center mt-4">
                <p>
                  Already have an account?{" "}
                  <Link to="/api/login" className="text-purple-400 hover:underline">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold text-center mb-6">Select Your Preferences</h2>

              <div className="space-y-3">
                {preferences.map((preference) => (
                  <label key={preference} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferences.split(',').includes(preference)}
                      onChange={() => handlePreferenceChange(preference)}
                      className="w-4 h-4 text-purple-500 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                    />
                    <span>{preference}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-gray-700 py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                >
                  Back
                </button>
                {
                  loading ? <button
                    type="submit"
                    className="bg-purple-500 py-2 px-4 rounded-lg hover:bg-purple-600 transition w-full"
                  >
                    <ClipLoader size={20} />
                  </button> : <button
                    type="submit"
                    className="bg-purple-500 py-2 px-4 rounded-lg hover:bg-purple-600 transition"
                  >
                    Register
                  </button>
                }

              </div>
            </form>
          )}
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Register;