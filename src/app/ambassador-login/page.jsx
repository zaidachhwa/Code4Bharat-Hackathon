"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Mail, Lock, Sparkles, ArrowRight } from "lucide-react";

export default function AmbassadorLoginPage() {

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/ambassador/login`,
        data,
        { withCredentials: true }
      );

      if (!res) {
        toast.error("Login failed. Please try again.");
        return;
      }

      if (res.data.ambassador.isApproved === false) {
        toast.error("Your application is under review.");
        return;
      }

      toast.success("Login Successful 🎉");
      setTimeout(() => {
        router.push("/ambassador-dashboard");
      }, 700);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center px-4">

        {/* MAIN CONTAINER */}
        <div className="w-full max-w-md">

          {/* CARD */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-10 transition-all duration-300 hover:shadow-2xl">

            {/* HEADER */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                Ambassador Login
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Access your internship dashboard
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* EMAIL */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail size={16} className="text-gray-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none bg-white transition-all"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock size={16} className="text-gray-500" />
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none bg-white transition-all"
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex justify-center items-center gap-2 ${
                  loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 shadow-md"
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Login
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="my-8 flex items-center justify-center">
              <div className="w-1/3 border-t border-gray-200"></div>
              <span className="px-3 text-xs text-gray-400">NEW HERE?</span>
              <div className="w-1/3 border-t border-gray-200"></div>
            </div>

            {/* REGISTER LINK */}
            <div className="text-center">
              <button
                onClick={() => router.push("/ambassador-register")}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition flex items-center justify-center gap-1"
              >
                Apply as Ambassador
                <Sparkles size={16} className="text-yellow-500" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
