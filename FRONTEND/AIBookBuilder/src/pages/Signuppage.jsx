import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance.js";
import { apiPath } from "../utils/apiPath";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axiosInstance.post(apiPath.AUTH.REGISTER, formData);
      navigate("/dashboard");
    } catch (err) {
  console.log("SIGNUP ERROR 👉", err.response?.data || err.message);
  setError(err.response?.data?.message || "Signup failed");
}

   finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl">

        <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 mb-6">
          <FaHome /> Home
        </Link>

        <h2 className="text-3xl font-bold text-center text-gray-900">Create Account</h2>
        <p className="text-center text-gray-500 mt-2">Join creators building books with AI</p>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">

          <div>
            <label className="text-sm text-gray-700">Username</label>
            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="username"
                required
                onChange={handleChange}
                className="w-full pl-10 py-3 border rounded-xl focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="w-full pl-10 py-3 border rounded-xl focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">Password</label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
              autoComplete="none"
                name="password"
                type="password"
                required
                onChange={handleChange}
                className="w-full pl-10 py-3 border rounded-xl focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link to="/login" className="text-purple-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
