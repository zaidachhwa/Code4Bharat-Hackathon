"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Mail, Lock, Sparkles, ArrowRight, Zap } from "lucide-react";

export default function AmbassadorLoginPage() {
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
      const res = await axios.post("http://localhost:5000/api/ambassador/login", data, {
        withCredentials: true,
      });

      console.log("Ambassador Login Response:", res.data.ambassador);

      if (!res) {
        toast.error("Login failed. Please try again.");
        return;
      }

      if (res.data.ambassador.isApproved === false) {
        toast.error(
          "Your application is under review. Admin has not approved yet."
        );
        return;
      }

      if (res.data.ambassador.isApproved === true) {
        toast.success("Login Successful 🎉");
        setTimeout(() => {
          router.push("/ambassador-dashboard");
        }, 800);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#FEF3C7',
            color: '#92400E',
            border: '2px solid #FCD34D',
          },
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative flex justify-center items-center min-h-screen px-4 py-12">
          <div className="w-full max-w-md">
            {/* Floating Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Zap className="w-4 h-4 text-yellow-900" />
                <span className="text-sm font-bold text-yellow-900 tracking-wide">
                  INNOVATEX HACKATHON
                </span>
                <Sparkles className="w-4 h-4 text-yellow-900" />
              </div>
            </div>

            {/* Main Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-yellow-200 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
              {/* Header with Gradient */}
              <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 px-8 py-8 text-center relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                <div className="relative">
                  <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-2xl mb-3">
                    <Sparkles className="w-8 h-8 text-yellow-900" />
                  </div>
                  <h1 className="text-3xl font-black text-yellow-900 mb-2 tracking-tight">
                    Ambassador Portal
                  </h1>
                  <p className="text-yellow-900/80 font-medium">
                    Welcome back! Access your dashboard
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <div className="px-8 py-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-500" />
                      Email Address
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="ambassador@innovatex.com"
                        {...register("email", { required: "Email is required" })}
                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 transition-all duration-300 text-sm font-medium bg-gray-50 focus:bg-white group-hover:border-yellow-300"
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                        <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-500" />
                      Password
                    </label>
                    <div className="relative group">
                      <input
                        type="password"
                        placeholder="••••••••"
                        {...register("password", { required: "Password is required" })}
                        className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 transition-all duration-300 text-sm font-medium bg-gray-50 focus:bg-white group-hover:border-yellow-300"
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                        <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg group relative overflow-hidden
                      ${
                        loading
                          ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 cursor-not-allowed"
                          : "bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-yellow-900 hover:shadow-xl hover:shadow-yellow-300/50"
                      }
                    `}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-3 border-yellow-900/30 border-t-yellow-900 rounded-full animate-spin"></div>
                          Logging in...
                        </>
                      ) : (
                        <>
                          Login to Dashboard
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    {!loading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </button>
                </form>

                {/* Register Link */}
                <div className="mt-8 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-4 bg-white text-gray-500 font-medium">
                        NEW HERE?
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => router.push("/ambassador-register")}
                    className="mt-4 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 hover:from-yellow-700 hover:via-amber-700 hover:to-orange-700 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    Apply as Ambassador
                    <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Badge */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 font-medium">
                Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 font-bold">InnovateX</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}