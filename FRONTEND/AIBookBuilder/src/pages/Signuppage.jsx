import React from "react";
import { FaUser, FaEnvelope, FaLock, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-200 shadow-xl">

        {/* Home Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 
          hover:text-purple-600 transition mb-6"
        >
          <FaHome />
          Home
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500">
            Join creators building books with AI
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="creativestory"
                className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-10 pr-4
                text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-10 pr-4
                text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-10 pr-4
                text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Button */}
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 
            text-white font-bold py-3 rounded-xl transition shadow-lg shadow-purple-600/20"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
