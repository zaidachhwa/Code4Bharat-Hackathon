"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Mail, Lock, Sparkles, ArrowRight, Award, Shield } from "lucide-react";

export default function AmbassadorLoginPage() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

  // const API_URL = "https://code4bharat-hackathon-backend.onrender.com/api"

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
    // ✅ Only success (2xx) comes here
    await axios.post(`${API_URL}/ambassador/login`, data, {
      withCredentials: true,
    });

    toast.success("Login Successful 🎉");
    setTimeout(() => router.push("/ambassador-dashboard"), 700);

  } catch (error) {
    // ✅ Backend responded with error (4xx / 5xx)
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message;

      if (status === 403) {
        toast.error(message || "Your application is under review.");
      } else if (status === 401) {
        toast.error(message || "Invalid email or password.");
      } else {
        toast.error(message || "Login failed. Please try again.");
      }

    } else if (error.request) {
      // ❌ No response from server
      toast.error("Server not responding. Please try again later.");
    } else {
      // ❌ Axios setup error
      toast.error("Something went wrong. Please try again.");
    }

  } finally {
    setLoading(false);
  }
};



  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center px-4 py-8">
        {/* MAIN CONTAINER */}
        <div className="w-full max-w-md">
          {/* CARD */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-yellow-200 overflow-hidden">
            {/* HEADER WITH GRADIENT */}
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-8 py-10 text-white">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Award className="w-9 h-9 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-center">
                Ambassador Login
              </h1>
              <p className="text-yellow-50 text-center mt-2 text-sm">
                Access your Ambassador Dashboard
              </p>
            </div>

            {/* FORM SECTION */}
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* EMAIL */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-orange-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", { required: "Email is required" })}
                    className="w-full border-2 border-orange-200 px-4 py-3 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 outline-none bg-orange-50/50 transition-all text-gray-700"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      ⚠️ {errors.email.message}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-orange-500" />
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full border-2 border-orange-200 px-4 py-3 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 outline-none bg-orange-50/50 transition-all text-gray-700"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      ⚠️ {errors.password.message}
                    </p>
                  )}
                </div>

                {/* FORGOT PASSWORD LINK */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium transition"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex justify-center items-center gap-2 shadow-lg ${
                    loading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:shadow-xl hover:scale-105"
                  }`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-3 border-white/40 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Login to Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* DIVIDER */}
              <div className="my-8 flex items-center justify-center">
                <div className="flex-1 border-t-2 border-gray-200"></div>
                <span className="px-4 text-xs text-gray-400 font-semibold">
                  NEW HERE?
                </span>
                <div className="flex-1 border-t-2 border-gray-200"></div>
              </div>

              {/* REGISTER LINK */}
              <div className="text-center">
                <button
                  onClick={() => router.push("/ambassador-register")}
                  className="w-full py-3 border-2 border-orange-300 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Apply as Ambassador
                </button>
              </div>

              {/* INFO BOX */}
              {/* <div className="mt-6 bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-orange-800 font-semibold mb-1">
                      Secure Login
                    </p>
                    <p className="text-xs text-orange-700">
                      Your credentials are encrypted and protected. Only approved
                      ambassadors can access the dashboard.
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* FOOTER TEXT */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Having trouble logging in?{" "}
            <button className="text-orange-600 font-semibold hover:text-orange-700">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
